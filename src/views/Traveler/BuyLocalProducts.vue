<script setup>
import { ref, onMounted } from 'vue'
import TravelerLayout from '@/components/TravelerLayout.vue';
import { supabase } from '@/utils/supabase.js'

const products = ref([])
const dialog = ref(false)
const selectedProduct = ref(null)
const orderQuantity = ref(1)

const fetchProducts = async () => {
  const { data, error } = await supabase.from('Products').select('*')
  if (error) {
    console.error('Error fetching products:', error)
  } else {
    products.value = data
  }
}
const openOrderDialog = (product) => {
  selectedProduct.value = product
  orderQuantity.value = 1
  dialog.value = true
}

const placeOrder = async () => {
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    alert("Please log in to place a order.")
    return
  }

  const { error } = await supabase.from('Orders').insert([
    {
    user_id: user.id,
    product_id: selectedProduct.value.product_id,
    quantity: orderQuantity.value,
    total_price: selectedProduct.value.price * orderQuantity.value,
    status: 'Pending',
    }
  ])

  if (error) {
    console.error('Order failed:', error)
    alert("Failed to place order.")
  } else {
    alert("Order placed successfully!")
    dialog.value = false
  }
}
onMounted(async () => {
  await fetchProducts()
  console.log('Fetched products:', products.value)
})
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
                :key="product.product_id"
                cols="12"
                sm="6"
                md="3"
              >
                <v-card class="pa-2">
                  <v-carousel height="125" hide-delimiters show-arrows class="mb-2">
                <v-carousel-item v-for="(image, i) in product.product_images" :key="i" :src="image" />
              </v-carousel>
                  <div class="text-subtitle-1 font-weight-medium">{{ product.product_name }}</div>
                  <div class="text-caption mb-2">{{ product.category }}</div>
                  <div class="text-caption mb-2">Stock: {{ product.stock }}</div>
                  <div class="text-green">₱{{ product.price }}</div>
                  <v-btn block color="green" variant="flat" @click="openOrderDialog(product)">Order</v-btn>
                </v-card>
                 <!-- Order Modal -->
                 <v-dialog v-model="dialog" max-width="500px" persistent>
                    <v-card class="rounded-xl elevation-4 pa-4">
                      <v-card-title class="text-h6 font-weight-bold d-flex align-center">
                        <v-icon class="me-2" color="green">mdi-cart</v-icon>
                        Place Order
                      </v-card-title>

                      <v-divider class="my-2" />

                      <v-card-text class="pt-0">
                        <v-list density="compact">
                          <v-list-item>
                            <v-list-item-title class="text-subtitle-2">Product</v-list-item-title>
                            <v-list-item-subtitle class="font-weight-medium">{{ selectedProduct?.product_name }}</v-list-item-subtitle>
                          </v-list-item>

                          <v-list-item>
                            <v-list-item-title class="text-subtitle-2">Category</v-list-item-title>
                            <v-list-item-subtitle>{{ selectedProduct?.category }}</v-list-item-subtitle>
                          </v-list-item>

                          <v-list-item>
                            <v-list-item-title class="text-subtitle-2">Stock Available</v-list-item-title>
                            <v-list-item-subtitle>{{ selectedProduct?.stock }}</v-list-item-subtitle>
                          </v-list-item>

                          <v-list-item>
                            <v-list-item-title class="text-subtitle-2">Price</v-list-item-title>
                            <v-list-item-subtitle class="text-green font-weight-medium">₱{{ selectedProduct?.price }}</v-list-item-subtitle>
                          </v-list-item>
                        </v-list>

                        <v-text-field
                          v-model="orderQuantity"
                          label="Quantity"
                          type="number"
                          min="1"
                          :max="selectedProduct?.stock"
                          density="comfortable"
                          class="mt-4"
                          outlined
                          color="green"
                        />
                      </v-card-text>

                      <v-divider class="my-2" />

                      <v-card-actions class="justify-end">
                        <v-btn variant="text" color="grey" @click="dialog = false">Cancel</v-btn>
                        <v-btn variant="flat" color="green" @click="placeOrder">Place Order</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>

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