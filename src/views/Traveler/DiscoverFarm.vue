<template>
    <TravelerLayout>
      <v-row>
    
        <v-col cols="12" class="px-6 pt-2"> 
          

          <h2 class="text-h6 font-weight-bold mb-4">Farms</h2>

          
          <v-tabs v-model="tab" align-tabs="start" color="green">
            <v-tab :value="1">Most Visited</v-tab>
            <v-tab :value="2">Best Price</v-tab>
            <v-tab :value="3">Near me</v-tab>
          </v-tabs>

          <v-window v-model="tab">
       
            <v-window-item :value="1">
              <v-row class="mt-4" dense>
                <v-col cols="12" md="3" v-for="n in 3" :key="n">
                  <v-card>
                    <v-img color="grey" height="180" src="" />
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
              </v-row>
            </v-window-item>
          </v-window>
       
</v-col>

      </v-row>
    </TravelerLayout>
  </template>
  
  <script setup>
 import TravelerLayout from '@/components/TravelerLayout.vue';
import { ref } from 'vue'

const tab = ref(null)
  </script>
  
  <style scoped>
  </style>