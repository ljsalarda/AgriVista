<script setup>
import { ref, onMounted } from 'vue'
import TravelerLayout from '@/components/TravelerLayout.vue';
import { supabase } from '@/utils/supabase.js'

const products = ref([])

const fetchProducts = async () => {
  const { data, error } = await supabase.from('Products').select('*')
  if (error) {
    console.error('Error fetching products:', error)
  } else {
    products.value = data
  }
}

onMounted(fetchProducts)
</script>
<template>
    <TravelerLayout>
    <v-row>
      <v-col cols="12" class="px-6 pt-2"> 
        <h2 class="text-h6 font-weight-bold mb-4">Shop Local Harvests</h2>
        <v-window>
          <v-window-item>
            <v-row class="mt-4" dense>
              <v-col
                v-for="product in products"
                :key="product.id"
                cols="12"
                sm="6"
                md="3"
              >
                <v-card class="pa-2">
                  <v-img
                    :src="product.image_url || 'https://via.placeholder.com/150'"
                    height="150px"
                    class="rounded mb-2"
                  />
                  <div class="text-subtitle-1 font-weight-medium">{{ product.product_name }}</div>
                  <div class="text-caption mb-2">{{ product.category }}</div>
                  <div class="text-caption mb-2">Stock: {{ product.stock }}</div>
                  <div class="text-green">₱{{ product.price }}</div>
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
  
  
  <style scoped>
  </style>