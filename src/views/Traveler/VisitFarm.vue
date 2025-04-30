<script setup>
import { ref, onMounted } from 'vue'
import TravelerLayout from '@/components/TravelerLayout.vue'
import { supabase } from '@/utils/supabase.js'

const tab = ref(null)
const showProfile = ref(false)

const orders = ref([])
const bookings = ref([])

const fetchOrders = async () => {
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return

  const { data, error } = await supabase
    .from('Orders')
    .select(`*, Products(product_name)`)
    .eq('user_id', user.id)

  if (!error) {
    orders.value = data
  } else {
    console.error('Failed to fetch orders:', error)
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
  } else {
    console.error('Failed to fetch bookings:', error)
  }
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
              <!-- Ordered Products Tab -->
<v-tabs-window-item value="purchased">
  <v-table>
    <thead>
      <tr>
        <th>Product Name</th>
        <th>Quantity</th>
        <th>Total Price</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="order in orders" :key="order.id">
        <td>{{ order.Products?.product_name }}</td>
        <td>{{ order.quantity }}</td>
        <td>₱ {{ order.total_price }}</td>
        <td>{{ order.status }}</td>
      </tr>
    </tbody>
  </v-table>
  <v-btn color="green" class="mt-4 text-white">
    View Full Sales History
  </v-btn>
</v-tabs-window-item>

<!-- Farm Booked Tab -->
<v-tabs-window-item value="bookings">
  <v-table>
    <thead>
      <tr>
        <th>Farm</th>
        <th>Location</th>
        <th>Farm Description</th>
        <th>Booking Date</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="booking in bookings" :key="booking.id">
        <td>{{ booking.Farms?.farm_name }}</td>
        <td>{{ booking.Farms?.location }}</td>
        <td>{{ booking.Farms?.farm_description }}</td>
        <td>{{ booking.booking_date }}</td>
        <td>{{ booking.status }}</td>
      </tr>
    </tbody>
  </v-table>
  <v-btn color="green" class="mt-4 text-white">
    View Full Bookings
  </v-btn>
</v-tabs-window-item>

            </v-tabs-window>
          </v-card-text>
        </v-card>
          
        </v-col>

      </v-row>
    </TravelerLayout>
  </template>
  

  
  <style scoped>
  </style>