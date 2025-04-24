<script setup>
import { ref } from 'vue'
import TravelerLayout from '@/components/TravelerLayout.vue';
const tab = ref(null)
const showProfile = ref(false)
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
              <v-tabs-window-item value="purchased">
                <v-table>
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Quantity</th>
                      <th>Date Ordered</th>
                      <th>Order Status</th>
                    </tr>
                  </thead>
                  <tbody>
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
                      <th>Farm</th>
                      <th>Booking Date</th>
                      <th>Package</th>
                    </tr>
                  </thead>
                  <tbody>
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