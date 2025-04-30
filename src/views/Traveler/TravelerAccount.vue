<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'
import TravelerLayout from '@/components/TravelerLayout.vue'
import { getAvatarText } from '@/utils/helpers'

const isEditing = ref(false)
const imageFile = ref(null)

const travelerData = ref({
  initials: '',
  email: '',
  full_name: '',
  address: '',
  contactNo: '',
  date: '',
  location: '',
  avatar_url: ''
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
    travelerData.value.initials = getAvatarText(user.user_metadata?.full_name || user.email)
  }
}

const handleImageUpload = async () => {
  if (!imageFile.value) return null
  const file = imageFile.value
  const fileExt = file.name.split('.').pop()
  const filePath = `avatars/${Date.now()}.${fileExt}`
  const { error } = await supabase.storage.from('avatars').upload(filePath, file)
  if (error) {
    alert('Image upload failed.')
    return null
  }
  const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)
  return data.publicUrl
}

const toggleEdit = async () => {
  if (isEditing.value) {
    const imageUrl = await handleImageUpload()
    const updatedData = {
      full_name: travelerData.value.full_name,
      address: travelerData.value.address,
      contactNo: travelerData.value.contactNo,
      date: travelerData.value.date,
      avatar_url: imageUrl || travelerData.value.avatar_url,
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
              <img v-if="travelerData.avatar_url" :src="travelerData.avatar_url" />
              <span v-else class="white--text text-h5">{{ travelerData.initials }}</span>
            </v-avatar>
            <div class="ms-4">
              <v-btn size="small" variant="outlined" @click="$refs.fileInput.click()" :disabled="!isEditing">Change Photo</v-btn>
              <input ref="fileInput" type="file" class="d-none" accept="image/*" @change="e => imageFile.value = e.target.files[0]" />
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
