<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { requiredValidator, emailValidator, passwordValidator } from '@/utils/validators'
import { supabase, formActionDefault } from '@/utils/supabase.js'

const router = useRouter()

const fullName = ref('')
const email = ref('')
const password = ref('')

const form = ref({ ...formActionDefault })

const registerFarmer = async () => {
  form.value.formProcess = true

  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        full_name: fullName.value,
        role: 'farmer' 
      }
    }
  })

  if (error) {
    form.value.formStatus = error.status || 500
    form.value.formErrorMessage = error.message
    form.value.formProcess = false
  } else {
    form.value.formStatus = 200
    form.value.formSuccessMessage = 'Registration successful! Please check your email to verify your account.'
    form.value.formProcess = false
    router.replace('/list-farm')
  }
}
</script>


<template>
    <v-app>
      <v-container fluid class="bg-container d-flex align-center justify-center">
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="6">
            <v-card class="pa-10 rounded-xl mx-auto text-center" elevation="10" max-width="100%">
              <v-row no-gutters>
                
                <v-col cols="12" md="5" class="pa-3 d-flex flex-column justify-center">
                 
                  <v-img class="mx-auto mb-2" src="/images/AgriVistaLogo.png" width="100"></v-img>
                  <h2 class="text-h6 font-weight-bold mb-2">List your farm and reach more visitors</h2>
  
                
                  <div class="d-flex justify-center my-2">
                    <v-btn icon class="mx-1" variant="outlined" size="small"><v-icon>mdi-facebook</v-icon></v-btn>
                    <v-btn icon class="mx-1" variant="outlined" size="small"><v-icon>mdi-google</v-icon></v-btn>
                    <v-btn icon class="mx-1" variant="outlined" size="small"><v-icon>mdi-apple</v-icon></v-btn>
                  </div>
  
                  <p class="text-caption text-grey-darken-1 mb-2">or</p>
  
                  
                  <v-form fast-fail @submit.prevent="registerFarmer">
                    <v-text-field
                      v-model="fullName"
                      label="Full name"
                      variant="outlined"
                      density="compact"
                      class="mb-2"
                      :rules="[requiredValidator]"
                    ></v-text-field>
                    <v-text-field
                      v-model="email"
                      label="Email"
                      variant="outlined"
                      density="compact"
                      class="mb-2"
                      :rules="[requiredValidator, emailValidator]"
                    ></v-text-field>
                    <v-text-field
                      v-model="password"
                      label="Password"
                      type="password"
                      variant="outlined"
                      density="compact"
                      :rules="[requiredValidator, passwordValidator]"
                    ></v-text-field>

                    <v-btn class="mt-3" type="submit" block color="success">Start</v-btn>
                  </v-form>

  
                  <p class="text-caption mt-3">
                    Already have an account? <RouterLink to="/login" class="text-green-darken-2">Log in</RouterLink>
                  </p>
                </v-col>
  
                <v-col cols="12" md="7" class="d-none d-md-block">
                  <v-img src="/public/images/bg2.jpg" class="h-100" cover style="border-radius: 20px;"></v-img>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </template>
  
  <style scoped>
  .bg-container {
    background: url('/src/assets/bg2.jpg') no-repeat center center;
    background-size: cover;
    min-height: 100vh;
  }
  .v-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
  }
  </style>