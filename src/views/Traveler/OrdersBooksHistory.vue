<script setup>
import { ref, onMounted } from 'vue'
import TravelerLayout from '@/components/TravelerLayout.vue'
import { supabase } from '@/utils/supabase.js'

const tab = ref(null)
const orders = ref([])
const bookings = ref([])

const selectedOrder = ref(null)
const selectedBooking = ref(null)

const showOrderDialog = ref(false)
const showBookingDialog = ref(false)

const fetchOrders = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const { data, error } = await supabase
    .from('Orders')
    .select('*, Products(product_name)')
    .eq('user_id', user.id)
    .in('status', ['Received' , 'Canceled'])

  if (!error) {
    orders.value = data
  }
}

const fetchBookings = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const { data, error } = await supabase
    .from('Bookings')
    .select('*, Farms(farm_name, location, farm_description)')
    .eq('user_id', user.id)
    .in('status', ['On Site' , 'Canceled'] )
  if (!error) {
    bookings.value = data
  }
}


const cancelOrder = async (orderId) => {
  await supabase.from('Orders').delete().eq('order_id', orderId)
  fetchOrders()
}

const cancelBooking = async (bookingId) => {
  await supabase.from('Bookings').delete().eq('booking_id', bookingId)
  fetchBookings()
}

onMounted(() => {
  fetchOrders()
  fetchBookings()
})
</script>

<template>
  <TravelerLayout>
    <v-row>
      <v-col cols="12" class="px-6 pt-2">
        <h2 class="text-h5 font-weight-bold mb-6 text-center">🕘 History of Orders & 🧑‍🌾 Visited Farms</h2>

        <v-card class="rounded-xl elevation-3 pa-4" style="height: 70vh;">
          <v-tabs v-model="tab" align-tabs="start" color="green-darken-2" grow>
            <v-tab value="purchased">🛒 Ordered Products</v-tab>
            <v-tab value="bookings">📅 Farm Bookings</v-tab>
          </v-tabs>

          <v-divider class="my-2" />

          <v-card-text class="overflow-y-auto flex-grow-1 px-0">
            <v-tabs-window v-model="tab">
              <v-tabs-window-item value="purchased">
                <v-table density="comfortable">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Quantity</th>
                      <th>Total Price</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="order in orders" :key="order.order_id">
                      <td>{{ order.Products?.product_name }}</td>
                      <td>{{ order.quantity }}</td>
                      <td>₱ {{ order.total_price }}</td>
                      <td>
                        <v-chip
                          :color="order.status === 'Received' ? 'green' : 'grey'"
                          text-color="white"
                          small
                        >
                          {{ order.status }}
                        </v-chip>
                      </td>
                      <td>
                        <v-btn icon size="x-small" color="red" @click="cancelOrder(order.order_id)">
                          <v-icon size="16">mdi-delete</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-tabs-window-item>

              <v-tabs-window-item value="bookings">
                <v-table density="comfortable">
                  <thead>
                    <tr>
                      <th>Farm</th>
                      <th>Location</th>
                      <th>Booking Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="booking in bookings" :key="booking.booking_id">
                      <td>{{ booking.Farms?.farm_name }}</td>
                      <td>{{ booking.Farms?.location }}</td>
                      <td>{{ booking.booking_date }}</td>
                      <td>
                        <v-chip
                          :color="booking.status === 'On Site' ? 'green' : 'grey'"
                          text-color="white"
                          small
                        >
                          {{ booking.status }}
                        </v-chip>
                      </td>
                      <td>
                        <v-btn icon size="x-small" color="red" @click="cancelBooking(booking.booking_id)">
                          <v-icon size="16">mdi-delete</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-tabs-window-item>
            </v-tabs-window>
          </v-card-text>

          <v-divider class="mt-2" />
          <div class="d-flex justify-start" style="position: absolute; bottom: 16px; left: 16px;">
            <v-btn color="green" rounded class="text-white" to="/OBhistory">
              View History
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="showOrderDialog" max-width="400">
      <v-card>
        <v-card-title>Edit Quantity</v-card-title>
        <v-card-text>
          <v-text-field
            label="Quantity"
            type="number"
            v-model="selectedOrder.quantity"
            min="1"
            density="compact"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="showOrderDialog = false">Cancel</v-btn>
          <v-btn color="green" text @click="saveOrderChanges">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showBookingDialog" max-width="400">
      <v-card>
        <v-card-title>Reschedule Booking</v-card-title>
        <v-card-text>
          <v-text-field
            label="New Booking Date"
            type="date"
            v-model="selectedBooking.booking_date"
            density="compact"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="showBookingDialog = false">Cancel</v-btn>
          <v-btn color="green" text @click="saveBookingChanges">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </TravelerLayout>
</template>
