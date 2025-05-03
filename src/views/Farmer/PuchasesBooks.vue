<script setup>
import DashboardLayout from '@/components/DashboardLayout.vue';
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase.js'

const tab = ref('purchased')
const orders = ref([])
const bookings = ref([])
const travelerData = ref({})

const fetchTravelerData = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    travelerData.value = {
      full_name: user.user_metadata.full_name || 'Traveler',

      contactNo: user.user_metadata.contactNo || 'No Number'
    }
  }
}

const fetchOrders = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const { data, error } = await supabase
    .from('traveler_orders')
    .select('*')
    .eq('product_owner_id', user.id)
    .in('status', ['Pending'])

  console.log("Orders Data:", data);

  if (!error) {
    orders.value = data.map(order => ({
      ...order,
      user: {
        full_name: order.buyer_name || 'Traveler',

        contactNo: order.buyer_contact || 'No Number'
      }
    }))
  } else {
    console.error('Failed to fetch traveler orders:', error)
  }
}

const fetchBookings = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const { data, error } = await supabase
    .from('traveler_bookings')
    .select('*')
    .eq('farm_owner_id', user.id)
    .in('status', ['Reservation'])

  console.log("Bookings Data:", data);

  if (!error) {
    bookings.value = data.map(booking => ({
      ...booking,
      user: {
        full_name: booking.guest_name || 'Traveler',
        contactNo: booking.guest_contact || 'No Number'
      }
    }))
  } else {
    console.error('Failed to fetch traveler bookings:', error)
  }
  
}

const updateOrderStatus = async (order_id) => {
  console.log("Updating order with ID:", order_id);
  const { data, error } = await supabase
    .from('Orders')
    .update({ status: 'Received' })
    .eq('order_id', order_id)

  if (error) {
    console.error('Error updating order status:', error);
  } else {
    console.log('Order status updated:', data);
    fetchOrders();
  }
  
};

const updateBookingStatus = async (booking_id) => {
  console.log("Updating booking with ID:", booking_id);
  const { data, error } = await supabase
    .from('Bookings')
    .update({ status: 'On Site' })
    .eq('booking_id', booking_id)

  if (error) {
    console.error('Error updating booking status:', error);
  } else {
    console.log('Booking status updated:', data);
    fetchBookings();
  }
}


onMounted(() => {
  fetchTravelerData()
  fetchOrders()
  fetchBookings()
})
</script>

<template>
  <DashboardLayout>
    <v-row>
      <v-col cols="12" class="px-6 pt-2">
        <h2 class="text-h5 font-weight-bold mb-6 text-center text-green-darken-3">📋 Purchases & Bookings</h2>

        <v-card class="rounded-xl elevation-3 pa-4">
          <v-tabs v-model="tab" align-tabs="start" color="green-darken-2" grow>
            <v-tab value="purchased">🛒 Ordered Products</v-tab>
            <v-tab value="bookings">📅 Farm Bookings</v-tab>
          </v-tabs>

          <v-divider class="my-2" />

          <v-card-text>
            <v-tabs-window v-model="tab">
              <!-- Purchased Products Tab -->
              <v-tabs-window-item value="purchased">
                <v-table density="comfortable" class="rounded-lg">
                  <thead>
                    <tr>
                      <th>Buyer</th>
                      <th>Phone Number</th>
                      <th>Product Name</th>
                      <th>Quantity</th>
                      <th>Total Price</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="order in orders" :key="order.order_id">
                      <td>{{ order.user?.full_name }}</td>
                      <td>{{ order.user?.contactNo }}</td>
                      <td>{{ order.product_name }}</td>
                      <td>{{ order.quantity }}</td>
                      <td>₱ {{ order.total_price }}</td>
                      <td>
                        <v-chip :color="order.status === 'Pending' ? 'orange' : 'grey'" text-color="white" small>
                          {{ order.status }}
                        </v-chip>
                      </td>
                      <td>
                        <v-btn icon class="mr-1" color="green" size="x-small" @click="updateOrderStatus(order.order_id)">
                          <v-icon size="16">mdi-check</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </v-table>

                <div class="mt-4">
                  <v-btn color="green" rounded class="text-white" to="/PBhistory">
                    View Full Sales History
                  </v-btn>
                </div>
              </v-tabs-window-item>

              <!-- Farm Bookings Tab -->
              <v-tabs-window-item value="bookings">
                <v-table density="comfortable" class="rounded-lg">
                  <thead>
                    <tr>
                      <th>Guest</th>
                      <th>Phone Number</th>
                      <th>Farm</th>
                      <th>Booking Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="booking in bookings" :key="booking.booking_id">
                      <td>{{ booking.guest_name }}</td>
                      <td>{{ booking.guest_contact }}</td>
                      <td>{{ booking.farm_name }}</td>
                      <td>{{ booking.booking_date }}</td>
                      <td>
                        <v-chip :color="booking.status === 'Reservation' ? 'green' : 'grey'" text-color="white" small>
                          {{ booking.status }}
                        </v-chip>
                      </td>
                      <td>
                        <v-btn icon class="mr-1" color="green" size="x-small" @click="updateBookingStatus(booking.booking_id)">
                          <v-icon size="16">mdi-check</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </v-table>

                <div class="mt-4">
                  <v-btn color="green" rounded class="text-white" to="/PBhistory">
                    View Full Bookings
                  </v-btn>
                </div>
              </v-tabs-window-item>
            </v-tabs-window>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </DashboardLayout>
</template>


<style scoped>
.gap-4 {
  gap: 1rem;
}
</style>
