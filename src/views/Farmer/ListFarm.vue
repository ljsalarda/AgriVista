<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import DashboardLayout from '@/components/DashboardLayout.vue'
import { supabase } from '@/utils/supabase.js'

// Router for optional navigation
const router = useRouter()

// Form state
const farm_name = ref('')
const location = ref('')
const farm_description = ref('')
const activity_name = ref('')
const duration = ref('')
const activity_description = ref('')
const loading = ref(false)

const addFarms = async () => {
  if (
    !farm_name.value ||
    !location.value ||
    !farm_description.value ||
    !activity_name.value ||
    !duration.value ||
    !activity_description.value
  ) {
    alert('Please fill in all fields.')
    return
  }

  loading.value = true

  try {
    const { data, error } = await supabase.from('Farms').insert([
      {
        farm_name: farm_name.value,
        location: location.value,
        farm_description: farm_description.value,
        activity_name: activity_name.value,
        duration: duration.value,
        activity_description: activity_description.value,
      },
    ])

    if (error) {
      console.error('Error adding farm:', error)
      alert('Something went wrong!')
    } else {
      alert('Farm added successfully!')

      // Clear form
      farm_name.value = ''
      location.value = ''
      farm_description.value = ''
      activity_name.value = ''
      duration.value = ''
      activity_description.value = ''

      // Optional redirect
      // router.push('/dashboard') // Uncomment and set desired route
    }
  } catch (err) {
    console.error('Unexpected error:', err)
    alert('An unexpected error occurred!')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <DashboardLayout>
    <template v-slot:app-bar>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-app-bar-title>My Farm Dashboard</v-app-bar-title>
    </template>

    <v-row>
      <v-col cols="12" class="px-6 pt-2">
        <v-card class="pa-6">
          <div class="px-6 py-4 mt-4" style="border: 1px solid #ccc;">
            <v-row dense>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="farm_name"
                  label="Farm Name"
                  prepend-inner-icon="mdi-sprout"
                  variant="outlined"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="location"
                  label="Location"
                  prepend-inner-icon="mdi-map-marker"
                  variant="outlined"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-textarea
                  v-model="farm_description"
                  label="Farm Description"
                  variant="outlined"
                  rows="6"
                ></v-textarea>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="activity_name"
                  label="Activity Name"
                  dense
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="duration"
                  label="Duration"
                  dense
                  outlined
                  class="mt-3"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-textarea
                  v-model="activity_description"
                  label="Description"
                  rows="5"
                  auto-grow
                  outlined
                  dense
                ></v-textarea>
              </v-col>
            </v-row>

            <v-btn
              color="green"
              prepend-icon="mdi-plus"
              elevation="0"
              rounded
              @click="addFarms"
              :loading="loading"
              :disabled="loading"
            >
              Add Farm
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </DashboardLayout>
</template>
