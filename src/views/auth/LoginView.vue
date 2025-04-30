<script setup>
import { ref } from 'vue'
import { requiredValidator, emailValidator, passwordValidator } from '@/utils/validators'
import { supabase, formActionDefault } from '@/utils/supabase'
import { useRouter } from 'vue-router'

const refVform = ref()

const formAction = ref({
  ...formActionDefault,
})

const formDataDefault = {
  email: '',
  password: '',
}

const formData = ref({
  ...formDataDefault,
})

const router = useRouter()

// This function is triggered on form submit
const onFormSubmit = () => {
  refVform.value?.validate().then(({ valid: isValid }) => {
    if (isValid) onSubmit()
  })
}

// This function handles the login process
const onSubmit = async () => {
  // Reset Form Action utils; Turn on processing at the same time
  formAction.value = { ...formActionDefault, formProcess: true }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.value.email,
    password: formData.value.password,
  })

  if (error) {
    // Handle the error message
    formAction.value.formErrorMessage = error.message
    formAction.value.formStatus = error.status
  } else if (data) {
    // Handle the success message
    formAction.value.formSuccessMessage = 'Successfully Logged Account.'

    // Fetch user metadata (including role) from Supabase
    const user = data.user
    if (user) {
      // Get role from user metadata
      const role = user.user_metadata?.role  // Ensure role is stored in user_metadata

      // Redirect based on the role
      if (role === "farmer") {
        router.replace('/list-farm')  // Redirect to farmer's page
      } else if (role === "traveler") {
        router.replace('/discoverfarm')  // Redirect to traveler's page
      } else {
        console.log("Role not found or unrecognized.")
      }
    }
  }

  // Reset Form
  refVform.value?.reset()
  // Turn off processing
  formAction.value.formProcess = false

  
}
</script>

<template>
  <v-app>
    <v-container fluid class="bg-container">
      <v-row justify="center" align="center" style="min-height: 100vh">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="elevation-12 login-card">
            <v-card-title class="text-center pt-6">
              <v-img src="/images/AgriVistaLogo.png" max-width="120" class="mx-auto"></v-img>
            </v-card-title>

            <v-card-text>
              <h2 class="text-center mb-4 font-weight-bold">Continue with</h2>
              <div class="d-flex justify-center mb-4">
                <v-btn icon="mdi-facebook" class="social-btn"></v-btn>
                <v-btn icon="mdi-google" class="social-btn mx-2"></v-btn>
                <v-btn icon="mdi-apple" class="social-btn"></v-btn>
              </div>
              <v-divider></v-divider>
              <p class="text-center my-4">or</p>
              <v-form ref="refVform" @submit.prevent="onFormSubmit">
                <v-text-field
                  label="Email"
                  variant="outlined"
                  density="comfortable"
                  :rules="[requiredValidator, emailValidator]"
                  v-model="formData.email"
                ></v-text-field>
                <v-text-field
                  label="Password"
                  type="password"
                  variant="outlined"
                  density="comfortable"
                  :rules="[requiredValidator, passwordValidator]"
                  v-model="formData.password"
                ></v-text-field>
                <v-btn
                  type="submit"
                  block
                  class="login-btn"
                  color="success"
                  :disabled="formAction.formProcess"
                  :loading="formAction.formProcess"
                >
                  <template #default>
                    Log In
                  </template>
                  <template #loading>
                    <v-progress-circular indeterminate color="white" size="24"></v-progress-circular>
                  </template>
                </v-btn>
              </v-form>
              <p class="text-center mt-4">
                Don't have an account?
                <RouterLink to="/register-pick" class="register-link">Register</RouterLink>
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style scoped>
.bg-container {
  background: url('@/assets/bg2.jpg') no-repeat center center;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
}

.social-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #f5f5f5;
}

.login-btn {
  border-radius: 25px;
  font-weight: bold;
  height: 45px;
}

.register-link {
  font-weight: bold;
  color: #2d7d46;
  text-decoration: none;
}
</style>
