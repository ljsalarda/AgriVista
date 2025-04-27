<script setup>
import { ref } from 'vue'

const roles = [
  {
    title: 'Traveler',
    description: 'Explore and book urban farm experiences',
    icon: 'mdi-run',
    route: '/register'
  },
  {
    title: 'Farm Owner',
    description: 'List your farm and connect with visitors',
    icon: 'mdi-home-group',
    route: '/registerfarmer'
  }
];
</script>

<template>
    <v-container fluid class="bg-container d-flex align-center justify-center">
      <v-row class="fill-height d-flex align-center justify-center">
        <v-col cols="12" md="8" lg="6">
          <v-card class="pa-16 rounded-xl text-center">
            <v-img src="/images/AgriVistaLogo.png" contain height="80" class="mx-auto"></v-img>
            <h2 class="mt-4 font-weight-bold">Choose your role to get started</h2>
            <v-row class="mt-4">
              <v-col v-for="role in roles" :key="role.title" cols="12" md="6">
                <v-card class="pa-4" outlined @click="$router.push(role.route)">
                  <v-icon size="40" color="success">{{ role.icon }}</v-icon>
                  <h3 class="mt-2">{{ role.title }}</h3>
                  <p class="text-caption">{{ role.description }}</p>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <style scoped>
  .bg-container {
    background: url('/src/assets/bg2.jpg') no-repeat center center;
    background-size: cover;
    min-height: 100vh; 
    display: flex;
    align-items: center;
    justify-content: center;
  }
  </style>
  
