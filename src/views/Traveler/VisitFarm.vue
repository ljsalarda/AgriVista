<template>
    <v-container fluid>
      <v-row>
    
        <v-col
            cols="12"
            md="3"
            class="d-flex flex-column justify-space-between"
            style="background-color: #f6fdf8; height: 100vh; padding: 32px ;"
          >
         
            <div>
   
              <v-img src="/images/AgriVistaLogo.png" contain height="50" class="mb-10" />

              <v-btn
              block
                height="50"
                class="mb-6 text-grey-darken-2"
                variant="text"
                prepend-icon="mdi-sprout"
                to="/discoverfarm"
                style="justify-content: flex-start; padding-left: 20px;"
              >
                Discover Farms
              </v-btn>

              <v-btn
              block
                height="50"
                class="mb-6 text-white font-weight-bold"
                color="green"
                rounded
                prepend-icon="mdi-email-outline"
                to="/visitfarm"
                style="justify-content: flex-start; padding-left: 20px;"
              >
                Visit Farm
              </v-btn>

              <v-btn
                block
                height="50"
                class="mb-6 text-grey-darken-2"
                variant="text"
                prepend-icon="mdi-basket-outline"
                to="/buylocalproducts"
                style="justify-content: flex-start; padding-left: 20px;"
              >
                Buy Local Products
              </v-btn>

              <v-btn
                block
                height="50"
                class="mb-6 text-grey-darken-2"
                variant="text"
                prepend-icon="mdi-account-outline"
                to="/traveleraccount"
                style="justify-content: flex-start; padding-left: 20px;"
              >
                Account
              </v-btn>
            </div>

            <div>
              <div class="d-flex align-center mb-4">
                <v-avatar size="48" class="me-3">
                  <img src="" alt="Profile" />
                </v-avatar>
                <div>
                  <div class="font-weight-bold text-black">Hanz Oraiz</div>
                  <div class="text-caption">Traveller</div>
                </div>
              </div>

              <v-btn
                block
                variant="text"
                class="text-left text-grey-darken-2"
                prepend-icon="mdi-logout"
                to="/login"
                style="justify-content: flex-start; padding-left: 20px;"
              >
                Log Out
              </v-btn>
            </div>
          </v-col>

  
    
        <v-col cols="12" md="9" class="pa-6">
          <div class="d-flex justify-space-between align-center py-4">
            <h2 class="font-weight-bold">Hello, Hanz</h2>
            <div class="d-flex align-center">
              <v-text-field
                prepend-inner-icon="mdi-magnify"
                placeholder="Search"
                hide-details
                dense
                rounded
                variant="outlined"
                style="max-width: 250px;"
              ></v-text-field>
              <v-btn icon><v-icon>mdi-bell</v-icon></v-btn>
              <v-btn icon><v-icon>mdi-cog</v-icon></v-btn>
            </div>
          </div>

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
    </v-container>
  </template>
  
  <script setup>
 import { ref } from 'vue'

const tab = ref(null)
  </script>
  
  <style scoped>
  </style>