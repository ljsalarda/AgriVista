<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import DashboardLayout from '@/components/DashboardLayout.vue'
import { supabase } from '@/utils/supabase.js'

const router = useRouter()

const farm_name = ref('')
const location = ref('')
const farm_description = ref('')
const activity_name = ref('')
const duration = ref('')
const activity_description = ref('')
const loading = ref(false)
const farms = ref([])

const snackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('success')

const fetchFarms = async () => {
  const {
    data: { user }, error: authError
  } = await supabase.auth.getUser()

  if (authError || !user) {
    console.error('Auth error:', authError)
    return
  }

  const { data, error } = await supabase
    .from('Farms')
    .select('*')
    .eq('user_id', user.id)
    .order('id', { ascending: false }) 

  if (error) {
    console.error('Error fetching farms:', error)
  } else {
    farms.value = data
  }
}

const addFarms = async () => {
  const {
    data: { user }, error: authError
  } = await supabase.auth.getUser()

  if (authError || !user) {
    snackbarMessage.value = 'You must be logged in.'
    snackbarColor.value = 'red'
    snackbar.value = true
    return
  }

  if (
    !farm_name.value ||
    !location.value ||
    !farm_description.value ||
    !activity_name.value ||
    !duration.value ||
    !activity_description.value
  ) {
    snackbarMessage.value = 'Please fill in all fields.'
    snackbarColor.value = 'red'
    snackbar.value = true
    return
  }

  loading.value = true

  try {
    const { data, error } = await supabase.from('Farms').insert([{
      user_id: user.id, 
      farm_name: farm_name.value,
      location: location.value,
      farm_description: farm_description.value,
      activity_name: activity_name.value,
      duration: duration.value,
      activity_description: activity_description.value,
    }]).select()

    if (error) {
      console.error('Error adding farm:', error)
      snackbarMessage.value = 'Something went wrong!'
      snackbarColor.value = 'red'
    } else {
      snackbarMessage.value = 'Farm added successfully!'
      snackbarColor.value = 'green'
      farms.value.unshift(data[0])  
      farm_name.value = ''
      location.value = ''
      farm_description.value = ''
      activity_name.value = ''
      duration.value = ''
      activity_description.value = ''
    }
  } catch (err) {
    console.error('Unexpected error:', err)
    snackbarMessage.value = 'An unexpected error occurred!'
    snackbarColor.value = 'red'
  } finally {
    loading.value = false
    snackbar.value = true
  }
}

onMounted(() => {
  fetchFarms()
})
</script>

<template>
  <DashboardLayout>

    <v-container>
      
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
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="location"
                    label="Location"
                    prepend-inner-icon="mdi-map-marker"
                    variant="outlined"
                  />
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    v-model="farm_description"
                    label="Farm Description"
                    variant="outlined"
                    rows="4"
                  />
                </v-col>
              </v-row>

              <v-row dense>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="activity_name"
                    label="Activity Name"
                    outlined
                    dense
                  />
                  <v-text-field
                    v-model="duration"
                    label="Duration"
                    outlined
                    dense
                    class="mt-3"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-textarea
                    v-model="activity_description"
                    label="Activity Description"
                    auto-grow
                    outlined
                    dense
                    rows="5"
                  />
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

      <v-row class="mt-6 justify-center" style="gap: 24px;" dense>
        <v-col
          v-for="(farm, index) in farms"
          :key="index"
          cols="12"
          sm="6"
          md="6"
          lg="5"
        >
          <v-card elevation="5" class="pa-4 rounded-xl">
            <!-- Avatar placeholder -->
            <div class="d-flex justify-center mb-3">
              <v-avatar size="96" class="elevation-2">
                <v-icon size="48" color="grey-lighten-1">mdi-image-off</v-icon>
              </v-avatar>
            </div>

            <v-card-title class="text-h6 font-weight-bold text-center">
              {{ farm.farm_name }}
            </v-card-title>

            <v-card-subtitle class="text-center mb-2 text-grey">
              {{ farm.location }}
            </v-card-subtitle>

            <v-divider class="mb-2" />

            <v-card-text class="text-body-2">
              <div class="mb-2">
                <strong>Description:</strong><br />
                {{ farm.farm_description }}
              </div>

              <div class="mb-2">
                <strong>Activity:</strong><br />
                {{ farm.activity_name }} ({{ farm.duration }})
              </div>

              <div>
                <strong>Details:</strong><br />
                {{ farm.activity_description }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>


      <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="3000">
        {{ snackbarMessage }}
      </v-snackbar>
    </v-container>
  </DashboardLayout>
</template>
