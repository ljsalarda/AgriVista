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
                      <th>Product Name</th>
                      <th>Quantity</th>
                      <th>Buyer</th>
                      <th>Date Ordered</th>
                      <th>Order Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- Example Row -->
                    <!-- <tr>
                      <td>Tomatoes</td>
                      <td>10kg</td>
                      <td>Juan Dela Cruz</td>
                      <td>2025-04-22</td>
                      <td>Delivered</td>
                    </tr> -->
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
                      <th>Guest Name</th>
                      <th>Booking Date</th>
                      <th>Package</th>
                      <th>Guests</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- Example Row -->
                    <!-- <tr>
                      <td>Ana Santos</td>
                      <td>2025-04-25</td>
                      <td>Farm Tour</td>
                      <td>4</td>
                    </tr> -->
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
