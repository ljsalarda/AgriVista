<script setup>
import { ref, onMounted } from 'vue'
import TravelerLayout from '@/components/TravelerLayout.vue'
import { supabase } from '@/utils/supabase.js'

const farms = ref([])
const tab = ref(1)
const dialog = ref(false)
const selectedFarm = ref(null)
const visit = ref(null) 

const userData = ref({
  email: '',
  full_name: '',
  address: '',
  contactNo: ''
})

const getUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    userData.value.email = user.email
    userData.value.full_name = user.user_metadata?.full_name
    userData.value.address = user.user_metadata?.address
    userData.value.contactNo = user.user_metadata?.contactNo
  }
}

const fetchFarms = async () => {
  const { data, error } = await supabase.from('Farms').select('*')
  if (error) {
    console.error('Error fetching farms:', error)
  } else {
    farms.value = data
  }
}

const openBookingModal = (farm) => {
  selectedFarm.value = farm
  visit.value = new Date().toISOString().slice(0, 16)
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
      farm_id: selectedFarm.value.farm_id,
      booking_date: visit.value,
      visit: visit.value,
      status: 'Reservation',
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

onMounted(() => {
  fetchFarms()
  getUser()
})
</script>

<template>
  <TravelerLayout>
    <v-container fluid>
      <v-row>
        <v-col cols="12" class="px-6 pt-4">
          <h2 class="text-h5 font-weight-bold mb-6 text-center">🌿 Explore Our Farms</h2>
          <v-row dense>
            <v-col cols="12" md="4" v-for="farm in farms" :key="farm.id">
              <v-card class="rounded-xl elevation-4">
                <v-carousel
                  v-if="farm.farm_images?.length"
                  height="160"
                  hide-delimiters
                  show-arrows
                  class="rounded-t-xl"
                >
                  <v-carousel-item
                    v-for="(img, i) in farm.farm_images"
                    :key="i"
                    :src="img"
                  />
                </v-carousel>
                <v-card-text>
                  <div class="text-h6 font-weight-medium mb-1">{{ farm.farm_name }}</div>
                  <div class="text-body-2 text-grey-darken-1 mb-1">📍 {{ farm.location }}</div>
                  <div class="text-body-2 mb-3">{{ farm.farm_description }}</div>
                  <v-btn block color="green" variant="flat" class="rounded-pill" @click="openBookingModal(farm)">
                    Book a Visit
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="dialog" max-width="700" transition="dialog-bottom-transition">
      <v-card class="rounded-xl elevation-10">
        <v-card-title class="text-h5 font-weight-bold px-6 pt-4">
          Book a Visit - {{ selectedFarm.farm_name }}
        </v-card-title>

        <v-card-text class="px-6">
          <v-carousel
            v-if="selectedFarm.farm_images?.length"
            height="160"
            hide-delimiters
            show-arrows
            class="rounded-lg mb-4"
          >
            <v-carousel-item
              v-for="(img, i) in selectedFarm.farm_images"
              :key="i"
              :src="img"
            />
          </v-carousel>

          <div class="text-body-2 text-grey-darken-1 mb-3">
            📍 {{ selectedFarm.location }}
          </div>

          <v-row dense>
            <v-col cols="12" md="6">
              <p class="text-subtitle-2 font-weight-bold mb-1">Farm Description:</p>
              <p class="text-body-2">{{ selectedFarm.farm_description }}</p>
            </v-col>
            <v-col cols="12" md="6">
              <p class="text-subtitle-2 font-weight-bold ">Activity:</p>
              <p class="text-body-2 font-weight-medium">{{ selectedFarm.activity_name }}</p>
              <p class="text-body-2 mb-2">{{ selectedFarm.activity_description }}</p>
              <p class="text-subtitle-2 font-weight-bold ">Duration: </p>
              <p class="text-body-2">{{ selectedFarm.duration }}</p>
            </v-col>
          </v-row>

          <v-divider class="my-4" />

          <div class="mb-4">
            <p class="text-subtitle-2 font-weight-bold mb-2">Your Info</p>
            <v-list density="compact" class="bg-transparent">
              <v-list-item prepend-icon="mdi-account">
                <v-list-item-title>{{ userData.full_name }}</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-email">
                <v-list-item-title>{{ userData.email }}</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-phone">
                <v-list-item-title>{{ userData.contactNo }}</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-home">
                <v-list-item-title>{{ userData.address }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </div>

          <v-text-field
            v-model="visit"
            type="datetime-local"
            label="Select Visit Date & Time"
            prepend-icon="mdi-calendar-clock"
            variant="outlined"
            color="green"
            class="rounded-xl"
          />
        </v-card-text>

        <v-card-actions class="px-6 pb-4">
          <v-spacer />
          <v-btn variant="text" color="grey" @click="dialog = false">Cancel</v-btn>
          <v-btn color="green" variant="flat" class="rounded-pill" @click="placeBooking">
            Confirm Booking
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </TravelerLayout>
</template>
