<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'
import TravelerLayout from '@/components/TravelerLayout.vue'
import { getAvatarText } from '@/utils/helpers'

const isEditing = ref(false)
const imageFile = ref(null)
const imageUrl = ref('')
const originalAvatarUrl = ref('') // 🆕 to store original image for cancel

const travelerData = ref({
  initials: '',
  email: '',
  full_name: '',
  address: '',
  contactNo: '',
  date: '',
  location: '',
  avatar_url: '',
  role: '',
})

const getTraveler = async () => {
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    travelerData.value.email = user.email
    travelerData.value.full_name = user.user_metadata?.full_name || ''
    travelerData.value.address = user.user_metadata?.address || ''
    travelerData.value.contactNo = user.user_metadata?.contactNo || ''
    travelerData.value.date = user.user_metadata?.date || ''
    travelerData.value.avatar_url = user.user_metadata?.avatar_url || ''
    travelerData.value.role = user.user_metadata?.role || ''
    travelerData.value.initials = getAvatarText(user.user_metadata?.full_name || user.email)

    if (travelerData.value.avatar_url) {
      imageUrl.value = travelerData.value.avatar_url
      originalAvatarUrl.value = travelerData.value.avatar_url // store original
    }
  }
}

const handleFileChange = (e) => {
  const file = e.target.files[0]
  imageFile.value = file
  if (file) {
    imageUrl.value = URL.createObjectURL(file) // Show preview immediately
  }
}

const uploadImage = async () => {
  if (!imageFile.value) return null

  const file = imageFile.value
  const role = travelerData.value.role.toLowerCase()
  const filePath = `${role}/${Date.now()}_${file.name}`

  const { error } = await supabase.storage
    .from('images')
    .upload(filePath, file)

  if (error) {
    alert('Upload failed!')
    console.error(error)
    return null
  }

  const { data } = supabase.storage.from('images').getPublicUrl(filePath)
  imageUrl.value = data.publicUrl
  return data.publicUrl
}

const toggleEdit = async () => {
  if (isEditing.value) {
    // Save
    const uploadedImageUrl = await uploadImage()
    const updatedData = {
      full_name: travelerData.value.full_name,
      address: travelerData.value.address,
      contactNo: travelerData.value.contactNo,
      date: travelerData.value.date,
      avatar_url: uploadedImageUrl || travelerData.value.avatar_url,
    }

    const { error } = await supabase.auth.updateUser({ data: updatedData })

    if (error) {
      alert('Failed to save.')
    } else {
      alert('Traveler profile saved successfully!')
      await getTraveler()
    }
  } else {
    // Cancel edit: restore original image preview
    imageUrl.value = originalAvatarUrl.value
    imageFile.value = null
  }

  isEditing.value = !isEditing.value
}

onMounted(getTraveler)
</script>

<template>
  <TravelerLayout>
    <v-container fluid class="pa-4">
      <v-row justify="center">
        <v-col cols="12" md="10" lg="8">
          <h2 class="text-h5 font-weight-bold mb-6 text-center">👤 Profile Settings</h2>

          <v-card class="pa-6 rounded-xl" elevation="1" style="border: 1px solid #e5e5e5;">
            <div class="d-flex align-center mb-6">
              <v-avatar size="96" class="elevation-1" style="border: 3px solid #ccc;">
                <img
                  v-if="imageUrl"
                  :src="imageUrl"
                  alt="Avatar"
                  class="rounded-circle"
                  style="width: 100%; height: 100%; object-fit: cover"
                />
                <v-icon v-else size="64" color="grey">mdi-account</v-icon>
              </v-avatar>

              <div class="ms-4">
                <div class="text-subtitle-1 font-weight-medium mb-2">
                  {{ travelerData.full_name || 'Your Name' }}
                </div>
                <v-btn
                  v-if="isEditing"
                  variant="text"
                  color="primary"
                  class="text-capitalize px-0"
                  @click="$refs.fileInput.click()"
                >
                  Change Photo
                </v-btn>
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  class="d-none"
                  @change="handleFileChange"
                />
              </div>
            </div>

            <v-divider class="mb-6"></v-divider>
            <v-row dense>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Full Name"
                  v-model="travelerData.full_name"
                  :disabled="!isEditing"
                  variant="plain"
                  hide-details
                  class="modern-field"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Address"
                  v-model="travelerData.address"
                  :disabled="!isEditing"
                  variant="plain"
                  hide-details
                  class="modern-field"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Email"
                  v-model="travelerData.email"
                  disabled
                  append-inner-icon="mdi-check-circle"
                  color="success"
                  variant="plain"
                  hide-details
                  class="modern-field"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Contact No."
                  v-model="travelerData.contactNo"
                  :disabled="!isEditing"
                  variant="plain"
                  hide-details
                  class="modern-field"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Birthday"
                  type="date"
                  v-model="travelerData.date"
                  :disabled="!isEditing"
                  variant="plain"
                  hide-details
                  class="modern-field"
                />
              </v-col>
            </v-row>

            <v-divider class="mt-6 mb-4"></v-divider>
            <div class="d-flex justify-end">
              <v-btn
                variant="flat"
                color="primary"
                class="text-capitalize"
                @click="toggleEdit"
              >
                {{ isEditing ? 'Save Changes' : 'Edit Profile' }}
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </TravelerLayout>
</template>

<style scoped>
.modern-field input {
  font-size: 16px;
  padding-left: 0;
  border-bottom: 1px solid #ddd !important;
}
.modern-field label {
  color: #888;
}
</style>
