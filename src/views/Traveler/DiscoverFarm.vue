<script setup>
import { ref, onMounted } from 'vue'
import TravelerLayout from '@/components/TravelerLayout.vue';
import { supabase } from '@/utils/supabase.js'

const farms = ref([])
const tab = ref(1)
const dialog = ref(false)
const selectedFarm = ref(null)

const fetchFarms = async () => {
  const { data, error } = await supabase.from('Farms').select('*')
  if (error) {
    console.error('Error fetching products:', error)
  } else {
    farms.value = data
  }
}

const openBookingModal = (farm) => {
  selectedFarm.value = farm
  dialog.value = true
}

const placeBooking = async () => {
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    alert("Please log in to place a booking.")
    return
  }

  const { error } = await supabase.from('Bookings').insert([
    {
      user_id: user.id,
      farm_id: selectedFarm.value.id,
      booking_date: new Date().toISOString().split('T')[0], // default to today or use a date picker
      status: 'pending',
    }
  ])

  if (error) {
    console.error('Booking failed:', error)
    alert("Failed to place booking.")
  } else {
    alert("Booking placed successfully!")
    dialog.value = false
  }
}


onMounted(fetchFarms)
</script>

<template>
    <TravelerLayout>
      <v-row>
        <v-col cols="12" class="px-6 pt-2"> 
          <h2 class="text-h6 font-weight-bold mb-4">Farms</h2>
          <v-window v-model="tab">
            <v-window-item :value="1">
              <v-row class="mt-4" dense>
                <v-col cols="12" md="4" v-for="farm in farms" :key="farm.id">
                  <v-card>
                    <v-img color="grey" height="180" src="" />
                    <v-card-title>{{ farm.farm_name }}</v-card-title>
                    <v-card-subtitle>{{ farm.location }} </v-card-subtitle>
                    <v-card-subtitle>{{ farm.farm_description }} </v-card-subtitle>
                    <v-btn block color="green" @click="openBookingModal(farm)" >Book</v-btn>
                  </v-card>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
          </v-col>
      </v-row>

       <!-- Booking Modal -->
       <v-dialog v-model="dialog" max-width="600" transition="dialog-bottom-transition">
          <v-card v-if="selectedFarm" class="rounded-xl">
            <v-img
              :src="selectedFarm.image_url || 'https://via.placeholder.com/600x200?text=Farm+Image'"
              height="200"
              cover
              class="rounded-t-xl"
            ></v-img>

            <v-card-title class="text-h6 font-weight-bold pb-1">
              {{ selectedFarm.farm_name }}
            </v-card-title>

            <v-card-subtitle class="text-subtitle-2 text-grey-darken-1 px-4">
              {{ selectedFarm.location }}
            </v-card-subtitle>

            <v-card-text class="px-4 pt-2">
              <div class="mb-4">
                <div class="font-weight-medium text-body-1 mb-1">Farm Description</div>
                <div class="text-body-2">{{ selectedFarm.farm_description }}</div>
              </div>

              <v-divider class="my-3" />

              <div>
                <div class="font-weight-medium text-body-1 mb-1">Activities</div>
                <div class="text-body-2"><strong>Activity:</strong> {{ selectedFarm.activity_name }}</div>
                <div class="text-body-2"><strong>Duration:</strong> {{ selectedFarm.duration }}</div>
                <div class="text-body-2"><strong>Description:</strong> {{ selectedFarm.activity_description }}</div>
              </div>
            </v-card-text>

            <v-card-actions class="px-4 pb-4">
              <v-spacer />
              <v-btn color="green" variant="flat" class="rounded-pill px-6" @click="placeBooking">
                Place Booking
              </v-btn>

            </v-card-actions>
          </v-card>
        </v-dialog>

    </TravelerLayout>
</template>
  
  <style scoped>
  </style>