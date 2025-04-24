<script setup>
import DashboardLayout from '@/components/DashboardLayout.vue';
</script>

<template>
  <DashboardLayout>
    <v-row>
      <v-col cols="12" class="px-6 pt-2">
        <h2 class="text-h6 font-weight-bold mb-4">Products</h2>

        <v-card class="pa-6" elevation="2" rounded="lg">
          <v-row dense>
            <v-col cols="12" md="6">
              <v-text-field label="Product Name" outlined></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select label="Category" outlined></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field label="Price" type="number" outlined></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field label="Stock Availability" outlined></v-text-field>
            </v-col>

            <v-col cols="12">
              <div class="d-flex gap-4">
                <v-file-input label="Image 1" prepend-icon="mdi-image" accept="image/*" outlined dense rounded />
                <v-file-input label="Image 2" prepend-icon="mdi-image" accept="image/*" outlined dense rounded />
                <v-file-input label="Image 3" prepend-icon="mdi-image" accept="image/*" outlined dense rounded />
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
  </DashboardLayout>
</template>

<style scoped>
.gap-4 {
  gap: 1rem;
}
</style>
