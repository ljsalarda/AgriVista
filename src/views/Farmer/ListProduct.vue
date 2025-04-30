<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import DashboardLayout from '@/components/DashboardLayout.vue'
import { supabase } from '@/utils/supabase.js'

// Form state
const product_name = ref('')
const category = ref('')
const price = ref(null)
const stock = ref('')

// Add product handler
const addProduct = async () => {
  if (!product_name.value || !category.value || !price.value || !stock.value) {
    alert('Please fill in all fields.')
    return
  }

  const { data, error } = await supabase
    .from('Products')
    .insert([
      {
        product_name: product_name.value,
        category: category.value,
        price: parseFloat(price.value),
        stock: stock.value,
      }
    ])

  if (error) {
    console.error('Error adding product:', error)
    alert('Something went wrong!')
  } else {
    alert('Product added successfully!')
    // Reset form
    product_name.value = ''
    category.value = ''
    price.value = null
    stock.value = ''
  }
}
</script>

<template>
  <DashboardLayout>
    <v-row>
      <v-col cols="12" class="px-6 pt-2">
        <h2 class="text-h6 font-weight-bold mb-4">Products</h2>

        <v-card class="pa-6" elevation="2" rounded="lg">
          <v-row dense>
            <v-col cols="12" md="6">
              <v-text-field v-model="product_name" label="Product Name" outlined />
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="category"
                :items="['Fruits', 'Vegetables', 'Herbs', 'Others']"
                label="Category"
                outlined
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="price" label="Price" type="number" outlined />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="stock" label="Stock Availability" outlined />
            </v-col>
          </v-row>
          <div class="d-flex justify-start mt-4 gap-4">
            <v-btn color="green" elevation="0" rounded @click="addProduct">Add</v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </DashboardLayout>
</template>

<style scoped>
.horizontal-scroll-wrapper {
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  padding: 0 0 12px 0;
  margin-bottom: 24px;
}

.scroll-content {
  display: flex;
  flex-wrap: nowrap;
  gap: 1rem;
}

.product-card {
  flex: 0 0 auto;
  width: 280px;
}

.horizontal-scroll-wrapper::-webkit-scrollbar {
  height: 6px;
}
.horizontal-scroll-wrapper::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 4px;
}

.gap-2 {
  gap: 0.5rem;
}
.gap-4 {
  gap: 1rem;
}
</style>
