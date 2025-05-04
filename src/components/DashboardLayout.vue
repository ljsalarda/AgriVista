<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { isAuthenticated, formActionDefault, supabase } from '@/utils/supabase'
import { getAvatarText } from '@/utils/helpers'

const router = useRouter()
const route = useRoute()

const drawerOpen = ref(false)
const menuVisible = ref(false)
const isLoggedin = ref(false)
const formAction = ref({ ...formActionDefault })

const userData = ref({
  initials: '',
  email: '',
  full_name: '',
  role: '',
  avatar_url: '',
})

const getLoggedStatus = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  isLoggedin.value = !!session
  if (isLoggedin.value) {
    await getUser()
  }
}

const getUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    const metadata = user.user_metadata || {}
    userData.value.email = user.email
    userData.value.full_name = metadata.full_name || ''
    userData.value.role = metadata.role || 'Farmer'
    userData.value.avatar_url = metadata.avatar_url || ''
    userData.value.initials = getAvatarText(metadata.full_name || user.email)
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
})

// Highlight active path
const isActive = (path) => computed(() => route.path === path)
</script>
<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar app elevation="2" color="white" class="d-md-none">
      <v-app-bar-nav-icon @click="drawerOpen = !drawerOpen" />
      <v-toolbar-title class="font-weight-bold text-grey-darken-3">AgriVista</v-toolbar-title>
    </v-app-bar>

    <!-- Mobile Drawer -->
    <v-navigation-drawer
      v-model="drawerOpen"
      temporary
      app
      class="d-md-none"
      color="#f6fdf8"
    >
      <div>
        <v-img src="/images/AgriVistaLogo.png" contain height="50" class="mb-10" />

        <v-btn
          block
          height="50"
          class="mb-4 rounded-xl "
          :color="isActive('/list-farm').value ? 'green-darken-1' : 'grey-lighten-4'"
          :variant="isActive('/list-farm').value ? 'elevated' : 'flat'"
          prepend-icon="mdi-sprout"
          to="/list-farm"
        >
          My Farm
        </v-btn>

        <v-btn
          block
          height="50"
          class="mb-4 rounded-xl"
          :color="isActive('/PuchasesBooks').value ? 'green-darken-1' : 'grey-lighten-4'"
          :variant="isActive('/PuchasesBooks').value ? 'elevated' : 'flat'"
          prepend-icon="mdi-email-outline"
          to="/PuchasesBooks"
        >
          Purchases & Books
        </v-btn>

        <v-btn
          block
          height="50"
          class="mb-4 rounded-xl"
          :color="isActive('/list-products').value ? 'green-darken-1' : 'grey-lighten-4'"
          :variant="isActive('/list-products').value ? 'elevated' : 'flat'"
          prepend-icon="mdi-basket-outline"
          to="/list-products"
        >
          List Products
        </v-btn>

        <v-btn
          block
          height="50"
          class="mb-4 rounded-xl"
          :color="isActive('/farmeraccount').value ? 'green-darken-1' : 'grey-lighten-4'"
          :variant="isActive('/farmeraccount').value ? 'elevated' : 'flat'"
          prepend-icon="mdi-account-outline"
          to="/farmeraccount"
        >
          Account
        </v-btn>
      </div>
    </v-navigation-drawer>

    <!-- Main Layout -->
    <v-container fluid class="pa-0">
      <v-row no-gutters>
        <!-- Sidebar for Desktop -->
        <v-col
          cols="3"
          class="d-none d-md-flex flex-column justify-space-between"
          style="background: linear-gradient(145deg, #f6fdf8, #e3f2e8); padding: 32px; min-height: 100vh;"
        >
          <div>
            <v-img src="/images/AgriVistaLogo.png" contain height="50" class="mb-10" />

            <v-btn
              block
              height="50"
              class="mb-4 rounded-xl "
              :color="isActive('/list-farm').value ? 'green-darken-1' : 'grey-lighten-4'"
              :variant="isActive('/list-farm').value ? 'elevated' : 'flat'"
              prepend-icon="mdi-sprout"
              to="/list-farm"
            >
              My Farm
            </v-btn>

            <v-btn
              block
              height="50"
              class="mb-4 rounded-xl"
              :color="isActive('/PuchasesBooks').value ? 'green-darken-1' : 'grey-lighten-4'"
              :variant="isActive('/PuchasesBooks').value ? 'elevated' : 'flat'"
              prepend-icon="mdi-email-outline"
              to="/PuchasesBooks"
            >
              Purchases & Books
            </v-btn>

            <v-btn
              block
              height="50"
              class="mb-4 rounded-xl"
              :color="isActive('/list-products').value ? 'green-darken-1' : 'grey-lighten-4'"
              :variant="isActive('/list-products').value ? 'elevated' : 'flat'"
              prepend-icon="mdi-basket-outline"
              to="/list-products"
            >
              List Products
            </v-btn>

            <v-btn
              block
              height="50"
              class="mb-4 rounded-xl"
              :color="isActive('/farmeraccount').value ? 'green-darken-1' : 'grey-lighten-4'"
              :variant="isActive('/farmeraccount').value ? 'elevated' : 'flat'"
              prepend-icon="mdi-account-outline"
              to="/farmeraccount"
            >
              Account
            </v-btn>
          </div>
        </v-col>

        <!-- Main Content -->
        <v-col cols="12" md="9">
          <v-main class="pa-0 mt-0 mt-md-0 mt-10">
            <v-container fluid>
              <div class="d-flex justify-space-between align-center py-5">
                <div class="ml-6">
                  <h2 class="text-h5 font-weight-bold text-green-darken-2 mb-1">👨‍🌾 Hello, Farmer</h2>
                  <p class="text-subtitle-1 text-grey-darken-1">Manage your farm efficiently</p>
                </div>

                <div class="d-flex align-center">
                  <!-- Settings Menu -->
                  <v-menu offset-y transition="scale-transition">
                    <template #activator="{ props }">
                      <v-btn class="mr-6" icon v-bind="props">
                        <v-icon color="grey-darken-1">mdi-cog</v-icon>
                      </v-btn>
                    </template>
                    <v-card class="pa-4" width="250" elevation="4">
                      <div class="d-flex align-center mb-4">
                        <v-avatar size="50" class="mr-3" color="grey-lighten-3" elevation="2">
                          <img
                            v-if="userData.avatar_url"
                            :src="userData.avatar_url"
                            alt="Avatar"
                            style="width: 100%; height: 100%; object-fit: cover"
                          />
                          <span v-else>{{ userData.initials || 'NN' }}</span>
                        </v-avatar>
                        <div>
                          <div class="text-subtitle-2 font-weight-bold">{{ userData.full_name }}</div>
                          <div class="text-caption text-grey-darken-1">{{ userData.role }}</div>
                        </div>
                      </div>

                      <v-divider class="my-2"></v-divider>

                      <v-btn
                        block
                        class="mt-2 rounded-xl"
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

              <!-- Slot Content -->
              <slot />
            </v-container>
          </v-main>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
