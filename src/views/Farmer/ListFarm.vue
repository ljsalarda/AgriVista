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
                to="/list-farm"
                style="justify-content: flex-start; padding-left: 20px;"
              >
              My Farm
              </v-btn>

              <v-btn
                block
                height="50"
                class="mb-6 text-grey-darken-2"
                variant="text"
                prepend-icon="mdi-email-outline"
                to="/PuchasesBooks"
                style="justify-content: flex-start; padding-left: 20px;"
              >
                PuchasesBooks
              </v-btn>

              <v-btn
                block
                height="50"
                class="mb-6 text-grey-darken-2"
                variant="text"
                prepend-icon="mdi-basket-outline"
                to="/list-products"
                style="justify-content: flex-start; padding-left: 20px;"
              >
                List Products
              </v-btn>

              <v-btn
                block
                height="50"
                class="mb-6 text-grey-darken-2"
                variant="text"
                prepend-icon="mdi-account-outline"
                to="/farmeraccount"
                style="justify-content: flex-start; padding-left: 20px;"
              >
                Account
              </v-btn>
            </div>

  
          </v-col>

  
    
        <v-col cols="12" md="9" class="pa-6">
          <div class="d-flex justify-space-between align-center py-4">
            <h2 class="font-weight-bold">Hello, Farmer</h2>
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

          <h2 class="text-h6 font-weight-bold mb-4">Your Farm</h2>

          <v-card class="pa-6" elevation="2" rounded="lg">
            <v-row dense>
          
              <v-col cols="12" md="6">
                <v-text-field
                  label="Farm Name"
                  prepend-inner-icon="mdi-sprout"
                  variant="outlined"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  label="Location"
                  prepend-inner-icon="mdi-map-marker"
                  variant="outlined"
                ></v-text-field>
              </v-col>

              <v-col cols="10" md="6">
                 
                <v-date-picker width="500"  style="height: 200px; max-height: 200px; overflow-y: auto;"></v-date-picker>
              </v-col>

              <v-col cols="12" md="6">
                <v-textarea
                  label="Farm Description"
                  variant="outlined"
                  rows="6"
                ></v-textarea>
                </v-col>
            </v-row>

            <div
   
              class="px-6 py-4 mt-4"
              elevation="0"
              rounded
              style="border: 1px solid #ccc;"
            >
              <v-row dense>
                <v-col cols="12" md="6">
                  <v-text-field
                    label="Activity Name"
                
                    dense
                    outlined
                  ></v-text-field>
                  <v-text-field
                    label="Duration"
                
                    dense
                    outlined
                    class="mt-3"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-textarea
                    label="Description"
                    
                    rows="5"
                    auto-grow
                    outlined
                    dense
                  ></v-textarea>
                </v-col>
              </v-row>

              <div class="d-flex justify-start mt-4" style="gap: 12px;">
                <v-btn color="blue" elevation="0" rounded height="36">Edit</v-btn>
                <v-btn color="red" elevation="0" rounded height="36">Delete</v-btn>
                <v-btn color="green" elevation="0" rounded height="36">Add</v-btn>
              </div>
            </div>

            <div class="d-flex justify-start mt-4">
              <v-btn
                color="green"
                prepend-icon="mdi-plus"
                elevation="0"
                rounded
              >
                Add Farm
              </v-btn>
            </div>
          </v-card>
</v-col>

      </v-row>
    </v-container>
  </template>
  
  <script setup>
 
  </script>
  
  <style scoped>
  </style>