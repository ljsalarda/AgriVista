<script setup>
import DashboardLayout from '@/components/DashboardLayout.vue';
</script>

<template>
  <DashboardLayout>
    <v-row>
      <v-col cols="12" class="px-6 pt-2">
        <h2 class="text-h6 font-weight-bold mb-4">Account Information</h2>

        <v-card class="pa-6" elevation="2" rounded="lg">
          <div class="d-flex justify-start mb-4">
            <v-avatar size="100" color="grey" class="ms-6">
              <img src="" alt="Profile" />
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
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </DashboardLayout>
</template>

<style scoped>
</style>
