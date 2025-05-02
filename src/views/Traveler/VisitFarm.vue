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

  if (!error) {
    bookings.value = data
  }
}

const openOrderDialog = (order) => {
  selectedOrder.value = { ...order }
  showOrderDialog.value = true
}

const openBookingDialog = (booking) => {
  selectedBooking.value = { ...booking }
  showBookingDialog.value = true
}

const saveOrderChanges = async () => {
  const { error } = await supabase
    .from('Orders')
    .update({ quantity: selectedOrder.value.quantity })
    .eq('order_id', selectedOrder.value.order_id)

  if (!error) {
    showOrderDialog.value = false
    fetchOrders()
  }
}

const saveBookingChanges = async () => {
  const { error } = await supabase
    .from('Bookings')
    .update({ booking_date: selectedBooking.value.booking_date })
    .eq('booking_id', selectedBooking.value.booking_id)

  if (!error) {
    showBookingDialog.value = false
    fetchBookings()
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
        <h2 class="text-h6 font-weight-bold mb-4">Explore Farms</h2>

        <v-card>
          <v-tabs v-model="tab" align-tabs="start" color="green">
            <v-tab value="purchased">Ordered Products</v-tab>
            <v-tab value="bookings">Farm Booked</v-tab>
          </v-tabs>

          <v-card-text>
            <v-tabs-window v-model="tab">
              <!-- Orders Tab -->
              <v-tabs-window-item value="purchased">
                <v-table>
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
                      <td>{{ order.status }}</td>
                      <td>
                        <v-btn icon class="mr-1" @click="openOrderDialog(order)">
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn icon color="red" @click="cancelOrder(order.order_id)">
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-tabs-window-item>

              <!-- Bookings Tab -->
              <v-tabs-window-item value="bookings">
                <v-table>
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
                      <td>{{ booking.status }}</td>
                      <td>
                        <v-btn icon class="mr-1" @click="openBookingDialog(booking)">
                          <v-icon>mdi-calendar-edit</v-icon>
                        </v-btn>
                        <v-btn icon color="red" @click="cancelBooking(booking.booking_id)">
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-tabs-window-item>
            </v-tabs-window>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Order Dialog -->
    <v-dialog v-model="showOrderDialog" max-width="400">
      <v-card>
        <v-card-title>Edit Quantity</v-card-title>
        <v-card-text>
          <v-text-field label="Quantity" type="number" v-model="selectedOrder.quantity" min="1" />
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="showOrderDialog = false">Cancel</v-btn>
          <v-btn color="green" text @click="saveOrderChanges">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Booking Dialog -->
    <v-dialog v-model="showBookingDialog" max-width="400">
      <v-card>
        <v-card-title>Reschedule Booking</v-card-title>
        <v-card-text>
          <v-text-field label="New Booking Date" type="date" v-model="selectedBooking.booking_date" />
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="showBookingDialog = false">Cancel</v-btn>
          <v-btn color="green" text @click="saveBookingChanges">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </TravelerLayout>
</template>

<style scoped>
</style>
