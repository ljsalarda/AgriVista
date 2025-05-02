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
    .in('status', ['Received'])

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
    .in('status', ['On Site'])

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


const deleteOrderStatus = async (order_id) => {
  const { error } = await supabase
    .from('Orders')
    .delete()
    .eq('order_id', order_id)

  if (error) {
    console.error('Error deleting order:', error)
  } else {
    // Remove it from the local orders list
    orders.value = orders.value.filter(order => order.order_id !== order_id)
    console.log('Order deleted successfully')
  }
}

const deleteBookingStatus = async (booking_id) => {
  const { error } = await supabase
    .from('Bookings')
    .delete()
    .eq('booking_id', booking_id)
  if (error) {
    console.error('Error deleting booking:', error)
  } else {
    // Remove it from the local bookings list
    bookings.value = bookings.value.filter(booking => booking.booking_id !== booking_id)
    console.log('Booking deleted successfully')
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
        <h2 class="font-weight-bold text-h4 mb-2">Purchases & Bookings Histories</h2>

        <v-card>
          <v-tabs v-model="tab" align-tabs="start" color="green">
            <v-tab value="purchased">Purchased Products</v-tab>
            <v-tab value="bookings">Farm Bookings</v-tab>
          </v-tabs>

          <v-card-text>
            <v-tabs-window v-model="tab">
              <!-- Purchased Products Tab -->
              <v-tabs-window-item value="purchased">
                <v-table>
                  <thead>
                    <tr>
                      <th>Buyer</th>
                      <th>Phone Number</th>
                      <th>Product Name</th>
                      <th>Quantity</th>
                      <th>Total Price</th>
                      <th>Status</th>
                      <th>Actions</th>  <!-- Added actions column -->
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="order in orders" :key="order.order_id">
                      <td>{{ order.user?.full_name }}</td>
                      <td>{{ order.user?.contactNo }}</td>
                      <td>{{ order.product_name }}</td>
                      <td>{{ order.quantity }}</td>
                      <td>₱ {{ order.total_price }}</td>
                      <td>{{ order.status }}</td>
                      <td>
                        <v-btn icon class="mr-1" color="green" size="x-small" @click="deleteOrderStatus(order.order_id)">
                          <v-icon size="16">mdi-delete</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
                <v-btn color="green" class="mt-4 text-white" to="/PuchasesBooks">
                  Back to Purchases & Bookings
                </v-btn>
              </v-tabs-window-item>

              <!-- Farm Bookings Tab -->
              <v-tabs-window-item value="bookings">
                <v-table>
                  <thead>
                    <tr>
                      <th>Guest</th>
                      <th>Phone Number</th>
                      <th>Farm</th>
                      <th>Booking Date</th>
                      <th>Status</th>
                      <th>Actions</th> <!-- Added actions column -->
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="booking in bookings" :key="booking.booking_id">
                      <td>{{ booking.guest_name }}</td>
                      <td>{{ booking.guest_contact }}</td>
                      <td>{{ booking.farm_name }}</td>
                      <td>{{ booking.booking_date }}</td>
                      <td>{{ booking.status }}</td>
                      <td>
                        <v-btn icon class="mr-1" color="green" size="x-small" @click="deleteBookingStatus(booking.booking_id)">

                          <v-icon size="16">mdi-delete</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
                <v-btn color="green" class="mt-4 text-white" to="/PuchasesBooks">
                  Back to Purchases & Bookings
                </v-btn>
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
