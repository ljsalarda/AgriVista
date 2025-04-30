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
  avatar_url: '',
})

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
  }
}

const handleImageUpload = async () => {
  if (!imageFile.value) return null

  const file = imageFile.value
  const fileExt = file.name.split('.').pop()
  const filePath = `avatars/${Date.now()}.${fileExt}`

  const { error } = await supabase.storage.from('avatars').upload(filePath, file)
  if (error) {
    alert('Upload failed!')
    console.error(error)
    return null
  }

  const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)
  return data.publicUrl
}

const toggleEdit = async () => {
  if (isEditing.value) {
    const imageUrl = await handleImageUpload()
    const updatedUser = {
      full_name: userData.value.full_name,
      role: userData.value.role,
      address: userData.value.address,
      contanctNo: userData.value.contanctNo,
      avatar_url: imageUrl || userData.value.avatar_url,
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
        <h2 class="text-h6 font-weight-bold mb-4">Account Information</h2>

        <v-card class="pa-6" elevation="2" rounded="lg">
          <div class="d-flex justify-start mb-4">
            <v-avatar size="100" color="grey" class="ms-6">
              <img v-if="userData.avatar_url" :src="userData.avatar_url" />
              <span v-else class="white--text text-h5">{{ userData.initials }}</span>
            </v-avatar>
            <div class="ms-4">
              <h5 class="mb-4">{{ userData.role }}</h5>
              <input
                class="ms-3"
                type="file"
                accept="image/*"
                :disabled="!isEditing"
                @change="e => imageFile.value = e.target.files[0]"
              />
            </div>
          </div>

          <v-row dense>
            <v-col cols="12" md="6">
              <v-text-field label="Full Name" outlined v-model="userData.full_name" :disabled="!isEditing" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field label="Address" outlined v-model="userData.address" :disabled="!isEditing" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="Email"
                outlined
                v-model="userData.email"
                disabled
                append-inner-icon="mdi-check-circle"
                color="success"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="Contact Number"
                outlined
                v-model="userData.contanctNo"
                :disabled="!isEditing"
              />
            </v-col>
          </v-row>

          <v-btn class="mt-4" color="primary" @click="toggleEdit">
            {{ isEditing ? 'Save' : 'Edit' }}
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </DashboardLayout>
</template>


<style scoped>
</style>
