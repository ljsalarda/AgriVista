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
                class="mb-6 text-white font-weight-bold"
                color="green"
                rounded
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
              
              <v-btn icon><v-icon>mdi-bell</v-icon></v-btn>
              <v-btn icon><v-icon>mdi-cog</v-icon></v-btn>
            </div>
          </div>

          <h2 class="text-h6 font-weight-bold mb-4">Account Information</h2>

          <v-card class="pa-6" elevation="2" rounded="lg">
          <div class="d-flex justify-start mb-4">
            <v-avatar size="100" color="grey" class="ms-6">
                  <img src=""  alt="Profile" />
                </v-avatar>
          </div>

          <v-row dense>
            <v-col cols="12" md="6">
              <v-text-field label="Farm Name" outlined />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field label="Address" outlined />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="Email"
                outlined
                append-inner-icon="mdi-check-circle"
                color="success"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="Contact No."
                outlined
                append-inner-icon="mdi-check-circle"
                color="success"
              />
            </v-col>
            <v-col cols="12" md="6">
            <v-text-field
                label="Date"
                type="date"
                outlined
                color="success"
                append-inner-icon="mdi-calendar"
            />
            </v-col>

            <v-col cols="12" md="6">
            <v-text-field
                label="Location"
                outlined
                color="success"
                append-inner-icon="mdi-map-marker"
            />
            </v-col>

          </v-row>
        </v-card>
</v-col>

      </v-row>
    </v-container>
  </template>
  
  <script setup>

  </script>
  
  <style scoped>
  </style>