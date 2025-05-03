<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase, formActionDefault } from '@/utils/supabase'
import { getAvatarText } from '@/utils/helpers'
import DashboardLayout from '@/components/DashboardLayout.vue'

const router = useRouter()

const formAction = ref({ ...formActionDefault })
const isEditing = ref(false)
const imageFile = ref(null)

const userData = ref({
  initials: '',
  email: '',
  full_name: '',
  role: '',
  address: '',
  contanctNo: '',
  avatar_url: ''
})

const imageUrl = ref('') // for previewing uploaded image

const getUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    userData.value.email = user.email
    userData.value.full_name = user.user_metadata?.full_name || ''
    userData.value.role = user.user_metadata?.role || 'Farmer'
    userData.value.address = user.user_metadata?.address || ''
    userData.value.contanctNo = user.user_metadata?.contanctNo || ''
    userData.value.avatar_url = user.user_metadata?.avatar_url || ''
    userData.value.initials = getAvatarText(user.user_metadata?.full_name || user.email)

    if (userData.value.avatar_url) {
      imageUrl.value = userData.value.avatar_url
    }
  }
}

const handleFileChange = (e) => {
  imageFile.value = e.target.files[0]
}

const uploadImage = async () => {
  if (!imageFile.value) return null

  const file = imageFile.value
  const role = userData.value.role.toLowerCase()
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
    const uploadedUrl = await uploadImage()

    const updatedUser = {
      full_name: userData.value.full_name,
      role: userData.value.role,
      address: userData.value.address,
      contanctNo: userData.value.contanctNo,
      ...(uploadedUrl && { avatar_url: uploadedUrl }),
    }

    const { error } = await supabase.auth.updateUser({ data: updatedUser })

    if (error) {
      alert('Failed to save.')
      console.error(error)
      return
    } else {
      alert('Saved successfully!')
      await getUser()
    }
  }

  isEditing.value = !isEditing.value
}

onMounted(() => {
  getUser()
})
</script>

<template>
  <DashboardLayout>
    <v-row>
      <v-col cols="12" class="px-6 pt-2">
        <h2 class="text-h5 font-weight-bold mb-6 text-center text-green-darken-3">Account Information</h2>

        <v-card class="pa-6 rounded-xl" elevation="1" style="border: 1px solid #e5e5e5;">
          <!-- Avatar Section -->
          <div class="d-flex align-center mb-6">
            <v-avatar size="96" class="elevation-1" style="border: 3px solid #ccc;">
              <img v-if="imageUrl" :src="imageUrl" alt="User Avatar" class="rounded-circle" style="width: 100%; height: 100%; object-fit: cover"/>
              <span v-else class="white--text text-h5">{{ userData.initials }}</span>
            </v-avatar>

            <div class="ms-4">
              <div class="text-subtitle-1 font-weight-medium mb-2">{{ userData.full_name || 'Your Name' }}</div>
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

          <!-- Form Fields -->
          <v-divider class="mb-6"></v-divider>
          <v-row dense>
            <v-col cols="12" md="6">
              <v-text-field
                label="Full Name"
                v-model="userData.full_name"
                :disabled="!isEditing"
                variant="plain"
                hide-details
                class="modern-field"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="Address"
                v-model="userData.address"
                :disabled="!isEditing"
                variant="plain"
                hide-details
                class="modern-field"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="Email"
                v-model="userData.email"
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
                v-model="userData.contanctNo"
                :disabled="!isEditing"
                variant="plain"
                hide-details
                class="modern-field"
              />
            </v-col>
          </v-row>

          <!-- Action -->
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
  </DashboardLayout>
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
