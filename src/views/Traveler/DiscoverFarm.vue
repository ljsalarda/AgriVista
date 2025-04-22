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
                class="mb-6 text-white font-weight-bold"
                color="green"
                rounded
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

          <h2 class="text-h6 font-weight-bold mb-4">Farms</h2>

          
          <v-tabs v-model="tab" align-tabs="start" color="green">
            <v-tab :value="1">Most Visited</v-tab>
            <v-tab :value="2">Best Price</v-tab>
            <v-tab :value="3">Near me</v-tab>
          </v-tabs>

          <v-window v-model="tab">
       
            <v-window-item :value="1">
              <v-row class="mt-4" dense>
                <v-col cols="12" md="4" v-for="n in 3" :key="n">
                  <v-card>
                    <v-img color="grey" height="160" src="" />
                    <v-card-title>Farm Name </v-card-title>
                    <v-card-subtitle>Location </v-card-subtitle>
                  </v-card>
                </v-col>
              </v-row>
            </v-window-item>

                <v-window-item :value="2">
                <v-row class="mt-4" dense>
                    <v-col cols="12" >
                    <v-card class="d-flex align-center pa-3"  >
                    
                        <v-img
                        
                        src=""
                        height="80"
                        width="100"
                        class="rounded mr-4"
                        cover
                        ></v-img>

                        <div class="flex-grow-1">
                        <div class="text-subtitle-1 font-weight-medium">Alibo Farm </div>
                        <div class="text-caption text-grey-darken-1">Olo-olo, San Jose City</div>
                        </div>

                        <div class="text-right">
                        <div class="text-subtitle-1 font-weight-bold">₱**,**/day</div>
                        </div>
                    </v-card>
                    </v-col>
                </v-row>
                </v-window-item>


            <v-window-item :value="3">
              <v-row class="mt-4">
                <v-col cols="12" md="8">
                  <v-sheet height="300" class="d-flex align-center justify-center grey lighten-2">
                    <span class="text-center">GOOGLE Map Integration<br />(this tab is optional)</span>
                  </v-sheet>
                </v-col>
                <v-col cols="12" md="4">
                  <v-card height="300" class="pa-4 d-flex align-center justify-center grey lighten-3">
                    <span class="text-center">Display nearby farms</span>
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

const tab = ref(null)
  </script>
  
  <style scoped>
  </style>