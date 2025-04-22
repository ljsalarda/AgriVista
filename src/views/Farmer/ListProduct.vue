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
                class="mb-6 text-white font-weight-bold"
                color="green"
                rounded
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
              <h2 class="font-weight-bold">Hello, Farmer</h2>
              <div class="d-flex align-center">
                <v-text-field prepend-inner-icon="mdi-magnify" placeholder="Search" hide-details dense rounded variant="outlined" style="max-width: 250px;"></v-text-field>
                <v-btn icon><v-icon>mdi-bell</v-icon></v-btn>
                <v-btn icon><v-icon>mdi-cog</v-icon></v-btn>
              </div>
            </div>
  
          <h1 class="font-weight-bold text-h4 mb-2">Hello, Farmer</h1>
          <h2 class="text-h6 font-weight-bold mb-4">Products</h2>
  
          <v-card class="pa-6" elevation="2" rounded="lg">
            <v-row dense>
              <v-col cols="12" md="6">
                <v-text-field label="Product Name"  outlined></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-select label="Category"  outlined></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Price"  type="number" outlined></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Stock Availability"  outlined></v-text-field>
              </v-col>
  
              <v-col cols="5">
                <div class="d-flex justify-start gap-4">
                  <v-file-input label="Image 1" prepend-icon="mdi-image" accept="image/*" outlined dense rounded></v-file-input>
                  <v-file-input label="Image 2" prepend-icon="mdi-image" accept="image/*" outlined dense rounded></v-file-input>
                  <v-file-input label="Image 3" prepend-icon="mdi-image" accept="image/*" outlined dense rounded></v-file-input>
                </div>
              </v-col>
            </v-row>
  
            <div class="d-flex justify-start mt-4 gap-4">
              <v-btn color="blue" elevation="0" rounded>Edit</v-btn>
              <v-btn color="red" elevation="0" rounded>Delete</v-btn>
              <v-btn color="green" elevation="0" rounded>Add</v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
 
  </script>
  
  <style scoped>
  .gap-4 {
    gap: 1rem;
  }
  </style>