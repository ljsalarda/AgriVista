<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'
import TravelerLayout from '@/components/TravelerLayout.vue'
import { getAvatarText } from '@/utils/helpers'

const isEditing = ref(false)
const imageFile = ref(null)
const imageUrl = ref('') // Add this to manage image URL

const travelerData = ref({
  initials: '',
  email: '',
  full_name: '',
  address: '',
  contactNo: '',
  date: '',
  location: '',
  avatar_url: '',
  role: '', // Ensure role is added to travelerData
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
    travelerData.value.role = user.user_metadata?.role || '' // Get role from metadata
    travelerData.value.initials = getAvatarText(user.user_metadata?.full_name || user.email)

    if (travelerData.value.avatar_url) {
      imageUrl.value = travelerData.value.avatar_url
    }
  }
}

const handleFileChange = (e) => {
  imageFile.value = e.target.files[0]
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
  }

  isEditing.value = !isEditing.value
}

onMounted(getTraveler)
</script>

<template>
  <TravelerLayout>
    <v-row>
      <v-col cols="12" class="px-6 pt-2">
        <h2 class="text-h6 font-weight-bold mb-4">Account Information</h2>

        <v-card class="pa-6" elevation="2" rounded="lg">
          <div class="d-flex justify-start mb-4">
            <v-avatar size="100" color="grey" class="ms-6">
              <img v-if="imageUrl" :src="imageUrl" alt="User Avatar" style="width: 100%; height: 100%; object-fit: cover"/>
              <span v-else class="white--text text-h5">{{ travelerData.initials }}</span>
            </v-avatar>
            <div class="ms-4">
              <input
                class="ms-3"
                type="file"
                accept="image/*"
                :disabled="!isEditing"
                @change="handleFileChange"
              />
            </div>
          </div>

          <v-row dense>
            <v-col cols="12" md="6">
              <v-text-field label="Full Name" outlined v-model="travelerData.full_name" :disabled="!isEditing" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field label="Address" outlined v-model="travelerData.address" :disabled="!isEditing" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field label="Email" outlined v-model="travelerData.email" disabled append-inner-icon="mdi-check-circle" color="success" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field label="Contact No." outlined v-model="travelerData.contactNo" :disabled="!isEditing" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field label="Birthday" type="date" outlined v-model="travelerData.date" :disabled="!isEditing" />
            </v-col>
          </v-row>

          <v-btn class="mt-4" color="primary" @click="toggleEdit">
            {{ isEditing ? 'Save' : 'Edit' }}
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </TravelerLayout>
</template>

<style scoped>
</style>
