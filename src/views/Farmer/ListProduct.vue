<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import DashboardLayout from '@/components/DashboardLayout.vue'
import { supabase } from '@/utils/supabase.js'

// Form state
const product_name = ref('')
const category = ref('')
const price = ref(null)
const stock = ref('')
const snackbar = reactive({
  show: false,
  color: 'success',
  message: ''
})

// Product list state
const products = ref([])

// Edit state
const isEditing = ref(false)
const editingProduct = ref(null)

// Add product handler
const addProduct = async () => {
  const {data: { user },error: authError} = await supabase.auth.getUser()
  if (!product_name.value || !category.value || !price.value || !stock.value) {
    snackbar.message = 'Please fill in all fields.'
    snackbar.color = 'error'
    snackbar.show = true
    return
  }

  const newProduct = {
    user_id: user.id, 
    product_name: product_name.value,
    category: category.value,
    price: parseFloat(price.value),
    stock: stock.value,
  }

  const { data, error } = await supabase
    .from('Products')
    .insert([newProduct])

  if (error) {
    console.error('Error adding product:', error)
    snackbar.message = 'Something went wrong!'
    snackbar.color = 'error'
    snackbar.show = true
  } else {
    snackbar.message = 'Product added successfully!'
    snackbar.color = 'success'
    snackbar.show = true

    // Add to local state
    products.value.push(newProduct)

    // Reset form
    product_name.value = ''
    category.value = ''
    price.value = null
    stock.value = ''
  }
}

// Edit product handler
const editProduct = (product) => {
  isEditing.value = true
  editingProduct.value = { ...product }
  product_name.value = product.product_name
  category.value = product.category
  price.value = product.price
  stock.value = product.stock
}

// Save edited product handler
const saveProduct = async () => {
  const updatedProduct = {
    product_name: product_name.value,
    category: category.value,
    price: parseFloat(price.value),
    stock: stock.value,
  }

  const { data, error } = await supabase
    .from('Products')
    .update(updatedProduct)
    .eq('id', editingProduct.value.id)

  if (error) {
    console.error('Error updating product:', error)
    snackbar.message = 'Something went wrong!'
    snackbar.color = 'error'
    snackbar.show = true
  } else {
    snackbar.message = 'Product updated successfully!'
    snackbar.color = 'success'
    snackbar.show = true

    // Update local state
    const index = products.value.findIndex(
      (product) => product.id === editingProduct.value.id
    )
    if (index !== -1) {
      products.value[index] = updatedProduct
    }

    // Reset form
    product_name.value = ''
    category.value = ''
    price.value = null
    stock.value = ''
    isEditing.value = false
  }
}

// Delete product handler
const deleteProduct = async (productId) => {
  const { data, error } = await supabase
    .from('Products')
    .delete()
    .eq('id', productId)

  if (error) {
    console.error('Error deleting product:', error)
    snackbar.message = 'Something went wrong!'
    snackbar.color = 'error'
    snackbar.show = true
  } else {
    snackbar.message = 'Product deleted successfully!'
    snackbar.color = 'success'
    snackbar.show = true

    // Remove from local state
    products.value = products.value.filter((product) => product.id !== productId)
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
            <v-btn
              color="green"
              elevation="0"
              rounded
              @click="isEditing ? saveProduct() : addProduct()"
            >
              {{ isEditing ? 'Save' : 'Add' }}
            </v-btn>
          </div>
        </v-card>

        <!-- Product Cards Section -->
        <v-row class="mt-6" dense>
          <v-col
            v-for="(product, index) in products"
            :key="product.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card class="pa-2 product-card" elevation="4" rounded="xl">
              <v-card-title class="text-h6">{{ product.product_name }}</v-card-title>
              <v-card-subtitle class="mb-2">{{ product.category }}</v-card-subtitle>
              <v-card-text>
                <div><strong>Price:</strong> ₱{{ product.price }}</div>
                <div><strong>Stock:</strong> {{ product.stock }}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn small color="blue" @click="editProduct(product)">Edit</v-btn>
                <v-btn small color="red" @click="deleteProduct(product.id)">Delete</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
      {{ snackbar.message }}
    </v-snackbar>
  </DashboardLayout>
</template>

<style scoped>
.gap-4 {
  gap: 1rem;
}
.product-card {
  transition: transform 0.2s ease-in-out;
}

.product-card:hover {
  transform: scale(1.05);
}
</style>
