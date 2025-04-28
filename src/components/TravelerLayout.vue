<script setup>
import { ref } from 'vue'
const drawerOpen = ref(false)
</script>

<template>
    <v-app>
      <v-app-bar
        app
        color="white"
        elevation="1"
        class="d-md-none"
      >
        <v-app-bar-nav-icon @click="drawerOpen = !drawerOpen" />
        <v-toolbar-title>AgriVista</v-toolbar-title>
      </v-app-bar>
  
      <v-navigation-drawer
        v-model="drawerOpen"
        temporary
        app
        class="d-md-none"
      >
        <div>
          <v-img src="/images/AgriVistaLogo.png" contain height="50" class="mb-10" />
  
          <v-btn block height="50" class="mb-6 text-white font-weight-bold" color="green" rounded
            prepend-icon="mdi-sprout" to="/discoverfarm" style="justify-content: flex-start; padding-left: 20px;">
            Discover Farms
          </v-btn>
  
          <v-btn block height="50" class="mb-6 text-grey-darken-2" variant="text"
            prepend-icon="mdi-email-outline" to="/visitfarm" style="justify-content: flex-start; padding-left: 20px;">
            Visit Farm
          </v-btn>
  
          <v-btn block height="50" class="mb-6 text-grey-darken-2" variant="text"
            prepend-icon="mdi-basket-outline" to="/buylocalproducts" style="justify-content: flex-start; padding-left: 20px;">
            Buy Local Products
          </v-btn>
  
          <v-btn block height="50" class="mb-6 text-grey-darken-2" variant="text"
            prepend-icon="mdi-account-outline" to="/traveleraccount" style="justify-content: flex-start; padding-left: 20px;">
            Account
          </v-btn>
        </div>
      </v-navigation-drawer>
  
      <v-container fluid>
        <v-row>
 
          <v-col
            cols="12"
            md="3"
            class="d-none d-md-flex flex-column justify-space-between"
            style="background-color: #f6fdf8; height: 100vh; padding: 32px;"
          >
            <div>
              <v-img src="/images/AgriVistaLogo.png" contain height="50" class="mb-10" />
  
              <v-btn block height="50" class="mb-6 text-white font-weight-bold" color="green" rounded
                prepend-icon="mdi-sprout" to="/discoverfarm" style="justify-content: flex-start; padding-left: 20px;">
                Discover Farms
              </v-btn>
  
              <v-btn block height="50" class="mb-6 text-grey-darken-2" variant="text"
                prepend-icon="mdi-email-outline" to="/visitfarm" style="justify-content: flex-start; padding-left: 20px;">
                Visit Farm
              </v-btn>
  
              <v-btn block height="50" class="mb-6 text-grey-darken-2" variant="text"
                prepend-icon="mdi-basket-outline" to="/buylocalproducts" style="justify-content: flex-start; padding-left: 20px;">
                Buy Local Products
              </v-btn>
  
              <v-btn block height="50" class="mb-6 text-grey-darken-2" variant="text"
                prepend-icon="mdi-account-outline" to="/traveleraccount" style="justify-content: flex-start; padding-left: 20px;">
                Account
              </v-btn>
            </div>
          </v-col>
  
          <v-main class="pa-0 mt-0 mt-md-0 mt-10">
            <v-container fluid>
                <div class="d-flex justify-space-between align-center py-4">
                    <h2 class="font-weight-bold">Hello, Traveler</h2>

                    <div class="d-flex align-center">
                        <v-menu offset-y transition="scale-transition">
                        <template #activator="{ props }">
                            <v-btn icon v-bind="props" class="mr-4">
                            <v-icon>mdi-bell</v-icon>
                            </v-btn>
                        </template>

                        <v-card class="pa-3" width="300">
                            <p class="text-subtitle-2 font-weight-medium mb-2">Notifications</p>
                            <p class="text-caption">You have no new notifications.</p>
                        </v-card>
                        </v-menu>

                        <v-menu offset-y transition="scale-transition">
                        <template #activator="{ props }">
                            <v-btn icon v-bind="props">
                            <v-icon>mdi-cog</v-icon>
                            </v-btn>
                        </template>

                        <v-card class="pa-4" width="250">
                            <div class="d-flex align-center mb-4">
                            <v-avatar size="50" class="mr-3">
                                <img src="https://via.placeholder.com/100" alt="Profile" />
                            </v-avatar>
                            <div>
                                <div class="text-subtitle-2 font-weight-medium">Hanz Dela Cruz</div>
                                <div class="text-caption text-grey-darken-1">Traveler</div>
                            </div>
                            </div>

                            <v-divider></v-divider>

                            <v-btn
                            block
                            class="mt-4"
                            color="red-darken-1"
                            to="/login"
                            >
                            <v-icon left>mdi-logout</v-icon> Logout
                            </v-btn>
                        </v-card>
                        </v-menu>
                    </div>
                </div>
              <slot />
            </v-container>
          </v-main>
        </v-row>
      </v-container>
    </v-app>
  </template>
  
