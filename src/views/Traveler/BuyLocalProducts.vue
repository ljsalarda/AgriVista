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
                class="mb-6 text-grey-darken-2"
                variant="text"
                prepend-icon="mdi-email-outline"
                to="/visitfarm"
                style="justify-content: flex-start; padding-left: 20px;"
              >
                Visit Farm
              </v-btn>

              <v-btn
              block
                height="50"
                class="mb-6 text-white font-weight-bold"
                color="green"
                rounded
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

          <h2 class="text-h6 font-weight-bold mb-4">Shop Local Harvests</h2>

        <v-tabs v-model="tab" align-tabs="start" color="green">
        <v-tab :value="1">Fresh Produce</v-tab>
        <v-tab :value="2">Herbal & Wellness</v-tab>
        <v-tab :value="3">Farm-to-Table Delights</v-tab>
        <v-tab :value="4">Plants & Gardening</v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item :value="1">
            <v-row class="mt-4" dense>
              <v-col cols="12" sm="6" md="3">
                <v-card class="pa-2">
                  <v-img  height="150px" class="rounded mb-2" />
                  <div class="text-subtitle-1 font-weight-medium">{{  }}</div>
                  <div class="text-green">₱{{  }}</div>
                  <div class="text-caption mb-2">{{  }}</div>
                  <v-btn block color="green" variant="flat">Place Order</v-btn>
                </v-card>
              </v-col>
            </v-row>
          </v-window-item>
        </v-window>
</v-col>

      </v-row>
    </v-container>
  </template>
  
  <script setup>
import { ref } from 'vue'


const tab = ref(0)


  </script>
  
  <style scoped>
  </style>