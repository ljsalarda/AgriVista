<template>
    <TravelerLayout>
      <v-row>
    
        <v-col cols="12" class="px-6 pt-2"> 
         

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
    </TravelerLayout>
  </template>
  
  <script setup>
import { ref } from 'vue'
import TravelerLayout from '@/components/TravelerLayout.vue';

const tab = ref(0)


  </script>
  
  <style scoped>
  </style>