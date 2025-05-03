<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { supabase } from '@/utils/supabase.js'
import DashboardLayout from '@/components/DashboardLayout.vue'

const farm_name = ref('')
const location = ref('')
const farm_description = ref('')
const activity_name = ref('')
const duration = ref('')
const activity_description = ref('')

const farmImages = ref([])
const previewImages = ref([])

const snackbar = reactive({
  show: false,
  color: 'success',
  message: ''
})

const farms = ref([])
const isEditing = ref(false)
const editingFarm = ref(null)
const editDialog = ref(false)
const loading = ref(false)
const userId = ref(null)

watch(farmImages, (files) => {
  previewImages.value = []
  for (const file of files) {
    const reader = new FileReader()
    reader.onload = () => {
      previewImages.value.push(reader.result)
    }
    reader.readAsDataURL(file)
  }
})

const fetchFarms = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  userId.value = user.id

  const { data, error } = await supabase
    .from('Farms')
    .select('*')
    .eq('user_id', user.id)

  if (error) {
    console.error('Error fetching farms:', error)
  } else {
    farms.value = data
  }
}

const uploadFarmImages = async () => {
  const urls = []

  for (const file of farmImages.value) {
    const filePath = `farm/${Date.now()}_${file.name}`
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

const addFarm = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!farm_name.value || !location.value || !farm_description.value || !activity_name.value || !duration.value || !activity_description.value) {
    snackbar.message = 'Please fill in all fields.'
    snackbar.color = 'error'
    snackbar.show = true
    return
  }

  const imageUrls = await uploadFarmImages()

  const newFarm = {
    user_id: user.id,
    farm_name: farm_name.value,
    location: location.value,
    farm_description: farm_description.value,
    activity_name: activity_name.value,
    duration: duration.value,
    activity_description: activity_description.value,
    farm_images: imageUrls
  }

  const { data, error } = await supabase
    .from('Farms')
    .insert([newFarm])
    .select()
    .single()

  if (error) {
    console.error('Error adding farm:', error)
    snackbar.message = 'Something went wrong!'
    snackbar.color = 'error'
    snackbar.show = true
  } else {
    snackbar.message = 'Farm added successfully!'
    snackbar.color = 'success'
    snackbar.show = true
    farms.value.push(data)

    farm_name.value = ''
    location.value = ''
    farm_description.value = ''
    activity_name.value = ''
    duration.value = ''
    activity_description.value = ''
    farmImages.value = []
    previewImages.value = []
  }
}

function editFarm(farm) {
  editingFarm.value = { ...farm }
  editDialog.value = true
}

async function saveEditFarm() {
  if (!editingFarm.value.farm_name || !editingFarm.value.location || !editingFarm.value.farm_description || !editingFarm.value.activity_name || !editingFarm.value.duration || !editingFarm.value.activity_description) {
    snackbar.message = 'Please fill in all fields.'
    snackbar.color = 'error'
    snackbar.show = true
    return
  }

  const { data, error } = await supabase
    .from('Farms')
    .update({
      farm_name: editingFarm.value.farm_name,
      location: editingFarm.value.location,
      farm_description: editingFarm.value.farm_description,
      activity_name: editingFarm.value.activity_name,
      duration: editingFarm.value.duration,
      activity_description: editingFarm.value.activity_description
    })
    .eq('farm_id', editingFarm.value.farm_id)
    .select()
    .single()

  if (error) {
    snackbar.message = 'Failed to update farm.'
    snackbar.color = 'error'
    snackbar.show = true
  } else {
    const idx = farms.value.findIndex(f => f.farm_id === editingFarm.value.farm_id)
    if (idx !== -1) farms.value[idx] = data
    snackbar.message = 'Farm updated!'
    snackbar.color = 'success'
    snackbar.show = true
    editDialog.value = false
  }
}

async function deleteFarm(id) {
  if (!id) {
    snackbar.message = 'Invalid farm ID.'
    snackbar.color = 'error'
    snackbar.show = true
    return
  }

  const { error } = await supabase
    .from('Farms')
    .delete()
    .eq('farm_id', id)

  if (error) {
    console.error('Error deleting farm:', error)
    snackbar.message = 'Failed to delete farm.'
    snackbar.color = 'error'
    snackbar.show = true
  } else {
    const idx = farms.value.findIndex(f => f.farm_id === id)
    if (idx !== -1) farms.value.splice(idx, 1)
    snackbar.message = 'Farm deleted!'
    snackbar.color = 'success'
    snackbar.show = true
  }
}

onMounted(() => {
  fetchFarms()
})
</script>


<template>
  <DashboardLayout>
    <v-row>
      <v-col cols="12" class="px-6 pt-2">
        <h2 class="text-h5 font-weight-bold mb-6 text-center text-green-darken-3">🌾 Farms</h2>

        <v-card class="pa-6 shadow-xl transition-all" elevation="8" rounded="lg" >
          <v-row dense>
            <v-col cols="12" md="6">
              <v-text-field v-model="farm_name" label="Farm Name" outlined dense class="mb-4" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="location" label="Location" outlined dense class="mb-4" />
            </v-col>
            <v-col cols="12" md="6">
              <v-textarea v-model="farm_description" label="Farm Description" outlined rows="4" dense class="mb-4" />
            </v-col>
            <v-col cols="12" md="6" class="d-flex flex-column align-center justify-center">
              <v-file-input
                v-model="farmImages"
                label="Upload Farm Images"
                multiple
                show-size
                accept="image/*"
                prepend-icon="mdi-image"
                outlined
                class="mb-6"
              />
              <v-carousel
                v-if="farmImages && farmImages.length"
                hide-delimiters
                height="200"
                show-arrows
                class="mx-auto transition-all"
              >
                <v-carousel-item
                  v-for="(image, i) in previewImages"
                  :key="i"
                  :src="image"
                />
              </v-carousel>
            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="12" md="6">
              <v-text-field v-model="activity_name" label="Activity Name" outlined dense class="mb-4" />
              <v-text-field v-model="duration" label="Duration" outlined dense class="mt-4 mb-4" />
            </v-col>
            <v-col cols="12" md="6">
              <v-textarea v-model="activity_description" label="Activity Description" outlined rows="5" dense class="mb-4" />
            </v-col>
          </v-row>

          <div class="d-flex justify-start mt-4 gap-6">
            <v-btn color="success" elevation="2" rounded @click="addFarm" class="transition-all transform hover:scale-105">
              Add Farm
            </v-btn>
          </div>
        </v-card>

        <!-- Farm Cards Section -->
        <v-row class="mt-6" dense>
          <v-col
            v-for="(farm, index) in farms"
            :key="farm.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card class="pa-4 farm-card shadow-lg hover:shadow-xl transition-all" elevation="6" rounded="xl" >
              <v-carousel
                v-if="farm.farm_images && farm.farm_images.length"
                height="175"
                hide-delimiters
                show-arrows
                class="mb-2 transition-all"
              >
                <v-carousel-item
                  v-for="(img, i) in farm.farm_images"
                  :key="i"
                  :src="img"
                />
              </v-carousel>

              <v-card-title class="text-h6 font-weight-bold">{{ farm.farm_name }}</v-card-title>
              <v-card-subtitle class="text-body-2 text-muted">{{ farm.location }}</v-card-subtitle>
              <v-card-text class="text-body-2">
                <div><strong>Description:</strong> {{ farm.farm_description }}</div>
                <div><strong>Activity:</strong> {{ farm.activity_name }}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn small color="success" @click="editFarm(farm)" class="hover:bg-green-700">Edit</v-btn>
                <v-btn small color="error" @click="deleteFarm(farm.farm_id)" class="hover:bg-red-700">Delete</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Edit Farm Modal -->
    <v-dialog v-model="editDialog" max-width="600" transition="dialog-bottom-transition">
      <v-card class="elevation-8">
        <v-card-title class="text-h5">Edit Farm</v-card-title>
        <v-card-text>
          <v-text-field v-model="editingFarm.farm_name" label="Farm Name" outlined dense class="mb-4" />
          <v-text-field v-model="editingFarm.location" label="Location" outlined dense class="mb-4" />
          <v-textarea v-model="editingFarm.farm_description" label="Farm Description" outlined rows="4" dense class="mb-4" />
          <v-text-field v-model="editingFarm.activity_name" label="Activity Name" outlined dense class="mb-4" />
          <v-text-field v-model="editingFarm.duration" label="Duration" outlined dense class="mb-4" />
          <v-textarea v-model="editingFarm.activity_description" label="Activity Description" outlined rows="5" dense class="mb-4" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="grey" text @click="editDialog = false">Cancel</v-btn>
          <v-btn color="success" @click="saveEditFarm">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000" top>
      {{ snackbar.message }}
    </v-snackbar>
  </DashboardLayout>
</template>


<style scoped>
.farm-card {
  transition: transform 0.2s ease-in-out;
}

.farm-card:hover {
  transform: scale(1.05);
}

</style>
