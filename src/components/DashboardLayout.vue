<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { isAuthenticated, formActionDefault, supabase } from '@/utils/supabase'
import { getAvatarText } from '@/utils/helpers'

const router = useRouter()

const drawerOpen = ref(false)
const menuVisible = ref(false)
const isLoggedin = ref(false)
const formAction = ref({ ...formActionDefault })

const userData = ref({
  initials: '',
  email: '',
  full_name: '',
  role: '',
})

const getLoggedStatus = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  console.log('Session:', session); 
  isLoggedin.value = !!session
  if (isLoggedin.value) {
    await getUser() 
  }
}


const getUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    console.log(user.user_metadata);
    userData.value.email = user.email
    userData.value.full_name = user.user_metadata?.full_name || ''
    userData.value.role = user.user_metadata?.role || 'Farmer'
    userData.value.initials = getAvatarText(user.user_metadata?.full_name || user.email)
  }
}

const onLogout = async () => {
  formAction.value = { ...formActionDefault }
  formAction.value.formProcess = true

  const { error } = await supabase.auth.signOut()
  formAction.value.formProcess = false

  if (error) {
    console.error('Error during logout:', error)
    return
  }

  router.replace('/')
}

onMounted(() => {
  getLoggedStatus()
  // getUser()
  console.log('User data onMounted:', userData.value);  
})

</script>

<template>
    <v-app>

      <v-app-bar
        app
        color="white"
        elevation="1"
        class="d-md-none"
      >
      <v-app-bar-nav-icon @click="drawerOpen = !drawerOpen" />

        <v-toolbar-title>AgriVista</v-toolbar-title>
      </v-app-bar>
  
      <v-navigation-drawer
        v-model="drawerOpen"
        temporary
        app
        class="d-md-none"
      >
 
        <div>
          <v-img src="/images/AgriVistaLogo.png" contain height="50" class="mb-10" />
  
          <v-btn block height="50" class="mb-6 text-white font-weight-bold" color="green" rounded
            prepend-icon="mdi-sprout" to="/list-farm" style="justify-content: flex-start; padding-left: 20px;">
            My Farm
          </v-btn>
  
          <v-btn block height="50" class="mb-6 text-grey-darken-2" variant="text"
            prepend-icon="mdi-email-outline" to="/PuchasesBooks" style="justify-content: flex-start; padding-left: 20px;">
            PuchasesBooks
          </v-btn>
  
          <v-btn block height="50" class="mb-6 text-grey-darken-2" variant="text"
            prepend-icon="mdi-basket-outline" to="/list-products" style="justify-content: flex-start; padding-left: 20px;">
            List Products
          </v-btn>
  
          <v-btn block height="50" class="mb-6 text-grey-darken-2" variant="text"
            prepend-icon="mdi-account-outline" to="/farmeraccount" style="justify-content: flex-start; padding-left: 20px;">
            Account
          </v-btn>
        </div>
      </v-navigation-drawer>
  
      <v-container fluid>
        <v-row>
  
          <v-col
            cols="12"
            md="3"
            class="d-none d-md-flex flex-column justify-space-between"
            style="background-color: #f6fdf8; height: 100vh; padding: 32px;"
          >
            <div>
              <v-img src="/images/AgriVistaLogo.png" contain height="50" class="mb-10" />
  
              <v-btn block height="50" class="mb-6 text-white font-weight-bold" color="green" rounded
                prepend-icon="mdi-sprout" to="/list-farm" style="justify-content: flex-start; padding-left: 20px;">
                My Farm
              </v-btn>
  
              <v-btn block height="50" class="mb-6 text-grey-darken-2" variant="text"
                prepend-icon="mdi-email-outline" to="/PuchasesBooks" style="justify-content: flex-start; padding-left: 20px;">
                PuchasesBooks
              </v-btn>
  
              <v-btn block height="50" class="mb-6 text-grey-darken-2" variant="text"
                prepend-icon="mdi-basket-outline" to="/list-products" style="justify-content: flex-start; padding-left: 20px;">
                List Products
              </v-btn>
  
              <v-btn block height="50" class="mb-6 text-grey-darken-2" variant="text"
                prepend-icon="mdi-account-outline" to="/farmeraccount" style="justify-content: flex-start; padding-left: 20px;">
                Account
              </v-btn>
            </div>
          </v-col>
          <v-main class="pa-0 mt-0 mt-md-0 mt-10">

            <v-container fluid>
                <div class="d-flex justify-space-between align-center py-4">
                    <h2 class="font-weight-bold">Hello, Farmer</h2>

                    <div class="d-flex align-center">
                        <v-menu offset-y transition="scale-transition">
                        <template #activator="{ props }">
                            <v-btn icon v-bind="props" class="mr-4">
                            <v-icon>mdi-bell</v-icon>
                            </v-btn>
                        </template>

                        <v-card class="pa-3" width="300">
                            <p class="text-subtitle-2 font-weight-medium mb-2">Notifications</p>
                            <p class="text-caption">You have no new notifications.</p>
                        </v-card>
                        </v-menu>

                        <v-menu offset-y transition="scale-transition">
                        <template #activator="{ props }">
                            <v-btn icon v-bind="props">
                            <v-icon>mdi-cog</v-icon>
                            </v-btn>
                        </template>

                        <v-card class="pa-4" width="250">
                            <div class="d-flex align-center mb-4">
                            <v-avatar size="50" class="mr-3">
                              {{ userData.initials || 'NN' }}
                            </v-avatar>
                            <div>
                              <div class="text-subtitle-3 font-weight-bold">{{ userData.full_name }}</div>
                              <div class="text-subtitle-2 font-weight-medium">{{ userData.role }}</div>
                            </div>
                            </div>

                            <v-divider></v-divider>

                            <v-btn
                            block
                            class="mt-4"
                            color="red-darken-1"
                            to="/login"
                            @click="onLogout"
                            :loading="formAction.formProcess"
                            :disabled="formAction.formProcess"
                            >
                            <v-icon left>mdi-logout</v-icon> Logout
                            </v-btn>
                        </v-card>
                        </v-menu>
                    </div>
                </div>
              <slot />
            </v-container>
          </v-main>
        </v-row>
      </v-container>
    </v-app>
  </template>