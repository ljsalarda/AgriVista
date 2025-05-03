<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { supabase } from '@/utils/supabase.js'
import DashboardLayout from '@/components/DashboardLayout.vue'

const product_name = ref('')
const category = ref('')
const price = ref(null)
const stock = ref('')
const snackbar = reactive({
  show: false,
  color: 'success',
  message: ''
})

const products = ref([])
const isEditing = ref(false)
const editingProduct = ref(null)
const editDialog = ref(false) 
const userId = ref(null)
const productImages = ref([]) 
const previewImages = ref([]) 

watch(productImages, (files) => {
  previewImages.value = []
  for (const file of files) {
    const reader = new FileReader()
    reader.onload = () => {
      previewImages.value.push(reader.result)
    }
    reader.readAsDataURL(file)
  }
})

const uploadProductImages = async () => {
  const urls = []

  for (const file of productImages.value) {
    const filePath = `product/${Date.now()}_${file.name}`
    const { error } = await supabase.storage.from('images').upload(filePath, file)
    if (error) {
      console.error('Upload error:', error)
      continue
    }
    const { data } = supabase.storage.from('images').getPublicUrl(filePath)
    urls.push(data.publicUrl)
  }

  return urls
}

const fetchProducts = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  userId.value = user.id

  const { data, error } = await supabase
    .from('Products')
    .select('*')
    .eq('user_id', user.id)

  if (error) {
    console.error('Error fetching products:', error)
  } else {
    products.value = data
  }
}

const addProduct = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!product_name.value || !category.value || !price.value || !stock.value) {
    snackbar.message = 'Please fill in all fields.'
    snackbar.color = 'error'
    snackbar.show = true
    return
  }

  const imageUrls = await uploadProductImages()

  const newProduct = {
    user_id: user.id,
    product_name: product_name.value,
    category: category.value,
    price: parseFloat(price.value),
    stock: stock.value,
    product_images: imageUrls 
  }

  const { data, error } = await supabase
    .from('Products')
    .insert([newProduct])
    .select()
    .single()

  if (error) {
    console.error('Error adding product:', error)
    snackbar.message = 'Something went wrong!'
    snackbar.color = 'error'
    snackbar.show = true
  } else {
    snackbar.message = 'Product added successfully!'
    snackbar.color = 'success'
    snackbar.show = true
    products.value.push(data)

    product_name.value = ''
    category.value = ''
    price.value = null
    stock.value = ''
    productImages.value = []
    previewImages.value = []
  }
}

function editProduct(product) {
  editingProduct.value = { ...product }
  editDialog.value = true
}

async function saveEditProduct() {
  if (
    !editingProduct.value.product_name ||
    !editingProduct.value.category ||
    !editingProduct.value.price ||
    !editingProduct.value.stock
  ) {
    snackbar.message = 'Please fill in all fields.'
    snackbar.color = 'error'
    snackbar.show = true
    return
  }

  const imageUrls = await uploadProductImages()

  const { data, error } = await supabase
    .from('Products')
    .update({
      product_name: editingProduct.value.product_name,
      category: editingProduct.value.category,
      price: parseFloat(editingProduct.value.price),
      stock: editingProduct.value.stock,
      product_images: imageUrls.length ? imageUrls : editingProduct.value.product_images // Use new images or keep old ones
    })
    .eq('product_id', editingProduct.value.product_id)
    .select()
    .single()

  if (error) {
    snackbar.message = 'Failed to update product.'
    snackbar.color = 'error'
    snackbar.show = true
  } else {
    const idx = products.value.findIndex(p => p.product_id === editingProduct.value.product_id)
    if (idx !== -1) products.value[idx] = data
    snackbar.message = 'Product updated!'
    snackbar.color = 'success'
    snackbar.show = true
    editDialog.value = false
  }
}

async function deleteProduct(product_id) {
  console.log("Deleting product with ID:", product_id)
  const { error } = await supabase
    .from('Products')
    .delete()
    .eq('product_id', product_id)
  if (error) {
    console.error('Error deleting product:', error)
    snackbar.message = 'Failed to delete product.'
    snackbar.color = 'error'
    snackbar.show = true
  } else {
    const idx = products.value.findIndex(p => p.product_id === product_id)
    if (idx !== -1) products.value.splice(idx, 1)
    snackbar.message = 'Product deleted!'
    snackbar.color = 'success'
    snackbar.show = true
  }
}

onMounted(() => {
  fetchProducts()
})
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
            <v-col cols="12" md="6" class="d-flex flex-column align-center justify-center">
              <v-file-input
                v-model="productImages"
                label="Upload Product Images"
                multiple
                show-size
                accept="image/*"
                prepend-icon="mdi-image"
                outlined
                class="mb-4"
              />
              <v-carousel v-if="previewImages && previewImages.length" hide-delimiters height="125" show-arrows class="mx-auto">
                <v-carousel-item v-for="(image, i) in previewImages" :key="i" :src="image" />
              </v-carousel>
            </v-col>
          </v-row>
          <div class="d-flex justify-start mt-4 gap-4">
            <v-btn
              color="green"
              elevation="0"
              rounded
              @click="isEditing ? saveEditProduct() : addProduct()"
            >
              {{ isEditing ? 'Save' : 'Add' }}
            </v-btn>
          </div>
        </v-card>

        <v-row class="mt-6" dense>
          <v-col
            v-for="(product, index) in products"
            :key="product.product_id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card class="pa-2 product-card" elevation="4" rounded="xl">
              <v-carousel height="125" hide-delimiters show-arrows class="mb-2">
                <v-carousel-item v-for="(image, i) in product.product_images" :key="i" :src="image" />
              </v-carousel>
              <v-card-title class="text-h6">{{ product.product_name }}</v-card-title>
              <v-card-subtitle class="mb-2">{{ product.category }}</v-card-subtitle>
              <v-card-text>
                <div><strong>Price:</strong> ₱{{ product.price }}</div>
                <div><strong>Stock:</strong> {{ product.stock }}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn small color="blue" @click="editProduct(product)">Edit</v-btn>
                <v-btn small color="red" @click="deleteProduct(product.product_id)">Delete</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-dialog v-model="editDialog" max-width="500">
      <v-card>
        <v-card-title>Edit Product</v-card-title>
        <v-card-text>
          <v-text-field v-model="editingProduct.product_name" label="Product Name" outlined />
          <v-select
            v-model="editingProduct.category"
            :items="['Fruits', 'Vegetables', 'Herbs', 'Others']"
            label="Category"
            outlined
          />
          <v-text-field v-model="editingProduct.price" label="Price" type="number" outlined />
          <v-text-field v-model="editingProduct.stock" label="Stock Availability" outlined />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="grey" text @click="editDialog = false">Cancel</v-btn>
          <v-btn color="green" @click="saveEditProduct">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
