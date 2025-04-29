<script setup>
import { ref, onMounted } from 'vue'
import DashboardLayout from '@/components/DashboardLayout.vue'

const productName = ref('')
const category = ref('')
const price = ref('')
const stock = ref('')
const image1 = ref(null)
const image2 = ref(null)
const image3 = ref(null)

const products = ref([])

const dialog = ref(false)
const confirmDeleteIndex = ref(null)

const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })
}

const addProduct = async () => {
  const images = []
  if (image1.value) images.push(await toBase64(image1.value))
  if (image2.value) images.push(await toBase64(image2.value))
  if (image3.value) images.push(await toBase64(image3.value))

  const newProduct = {
    name: productName.value,
    category: category.value,
    price: price.value,
    stock: stock.value,
    images,
    isEditing: false,
  }

  products.value.unshift(newProduct)
  clearForm()
  saveToLocalStorage()
}

const clearForm = () => {
  productName.value = ''
  category.value = ''
  price.value = ''
  stock.value = ''
  image1.value = null
  image2.value = null
  image3.value = null
}

const toggleEdit = (product) => {
  product.isEditing = !product.isEditing
}

const saveEdit = (product) => {
  product.isEditing = false
  saveToLocalStorage()
}

const requestDelete = (index) => {
  confirmDeleteIndex.value = index
  dialog.value = true
}

const confirmDelete = () => {
  if (confirmDeleteIndex.value !== null) {
    products.value.splice(confirmDeleteIndex.value, 1)
    saveToLocalStorage()
  }
  dialog.value = false
  confirmDeleteIndex.value = null
}

const saveToLocalStorage = () => {
  localStorage.setItem('products', JSON.stringify(products.value))
}

const loadFromLocalStorage = () => {
  const stored = localStorage.getItem('products')
  if (stored) {
    products.value = JSON.parse(stored)
  }
}

onMounted(() => {
  loadFromLocalStorage()
})
</script>

<template>
  <DashboardLayout>
    <v-row>
      <v-col cols="12" class="px-6 pt-2">
        <h2 class="text-h6 font-weight-bold mb-4">Products</h2>

        <!-- HORIZONTAL PRODUCTS DISPLAY -->
          <v-col cols="12">
            <div class="horizontal-scroll-wrapper">
              <div class="scroll-content">
                <v-card
                  v-for="(product, index) in products"
                  :key="index"
                  class="pa-4 product-card"
                  outlined
                >
                  <div v-if="!product.isEditing">
                    <h3 class="text-subtitle-1 font-weight-bold">{{ product.name }}</h3>
                    <p>Category: {{ product.category }}</p>
                    <p>Price: ₱{{ product.price }}</p>
                    <p>Stock: {{ product.stock }}</p>
                    <div class="d-flex gap-2 mt-2">
                      <v-img
                        v-for="(img, i) in product.images"
                        :key="i"
                        :src="img"
                        max-width="80"
                        max-height="80"
                        class="rounded"
                      />
                    </div>
                    <div class="d-flex gap-2 mt-3">
                      <v-btn color="blue" size="small" @click="toggleEdit(product)">Edit</v-btn>
                      <v-btn color="red" size="small" @click="requestDelete(index)">Delete</v-btn>
                    </div>
                  </div>
                  <div v-else>
                    <v-text-field v-model="product.name" label="Product Name" dense />
                    <v-select
                      v-model="product.category"
                      :items="['Fruits', 'Vegetables', 'Herbs', 'Others']"
                      label="Category"
                      dense
                    />
                    <v-text-field v-model="product.price" label="Price" type="number" dense />
                    <v-text-field v-model="product.stock" label="Stock Availability" dense />
                    <div class="d-flex gap-2 mt-2">
                      <v-btn color="green" size="small" @click="saveEdit(product)">Save</v-btn>
                      <v-btn size="small" @click="toggleEdit(product)">Cancel</v-btn>
                    </div>
                  </div>
                </v-card>
              </div>
            </div>
          </v-col>

        <!-- ADD PRODUCT FORM -->
        <v-card class="pa-6" elevation="2" rounded="lg">
          <v-row dense>
            <v-col cols="12" md="6">
              <v-text-field v-model="productName" label="Product Name" outlined />
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
            <v-col cols="12">
              <div class="d-flex gap-4">
                <v-file-input
                  v-model="image1"
                  label="Upload Image"
                  prepend-icon="mdi-image"
                  accept="image/*"
                  outlined
                  dense
                />
              </div>
            </v-col>
          </v-row>
          <div class="d-flex justify-start mt-4 gap-4">
            <v-btn color="green" elevation="0" rounded @click="addProduct">Add</v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- DELETE CONFIRMATION DIALOG -->
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6">Confirm Deletion</v-card-title>
        <v-card-text>Are you sure you want to delete this product?</v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="dialog = false">Cancel</v-btn>
          <v-btn color="red" text @click="confirmDelete">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
