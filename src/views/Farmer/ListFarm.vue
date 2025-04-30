<script setup>
import DashboardLayout from '@/components/DashboardLayout.vue';
</script>

<template>
  <DashboardLayout>

    <template v-slot:app-bar>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-app-bar-title>My Farm Dashboard</v-app-bar-title>
    </template>

    <v-row>
      <v-col cols="12" class="px-6 pt-2"> 
   
        <v-card class="pa-6" >
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
        
            <v-col cols="12" md="6">
              <v-textarea
                label="Farm Description"
                variant="outlined"
                rows="6"
              ></v-textarea>
            </v-col>
          </v-row>

          <div class="px-6 py-4 mt-4" style="border: 1px solid #ccc;">
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
  </DashboardLayout>
</template>
