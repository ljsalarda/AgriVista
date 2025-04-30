<script setup>
import DashboardLayout from '@/components/DashboardLayout.vue';
import { ref } from 'vue';

const tab = ref('purchased');
</script>

<template>
  <DashboardLayout>
    <v-row>
      <v-col cols="12" class="px-6 pt-2"> 


        <h2 class="font-weight-bold text-h4 mb-2">Puchases & Bookings</h2>

        <v-card>
          <v-tabs v-model="tab" align-tabs="start" color="green">
            <v-tab value="purchased">Purchased Products</v-tab>
            <v-tab value="bookings">Farm Bookings</v-tab>
          </v-tabs>

          <v-card-text>
            <v-tabs-window v-model="tab">
              <v-tabs-window-item value="purchased">
                <v-table>
                  <thead>
                    <tr>
                      <th>Buyer</th>
                      <th>Product Name</th>
                      <th>Quantity</th>
                      <th>Total Price</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="order in orders" :key="order.id">
                      <td>{{ travelerData.full_name }}</td>
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

              <v-tabs-window-item value="bookings">
                <v-table>
                  <thead>
                    <tr>
                      <th>Guest</th>
                      <th>Farm</th>
                      <th>Location</th>
                      <th>Farm Description</th>
                      <th>Booking Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="booking in bookings" :key="booking.id">
                      <td>{{ travelerData.full_name }}</td>
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
  </DashboardLayout>
</template>

<style scoped>
.gap-4 {
  gap: 1rem;
}
</style>
