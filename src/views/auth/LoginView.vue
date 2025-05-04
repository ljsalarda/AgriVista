<script setup>
import { ref } from 'vue'
import { requiredValidator, emailValidator, passwordValidator } from '@/utils/validators'
import { supabase, formActionDefault } from '@/utils/supabase'
import { useRouter } from 'vue-router'

const refVform = ref()

const formAction = ref({ ...formActionDefault })

const formDataDefault = {
  email: '',
  password: '',
}

const formData = ref({ ...formDataDefault })

const router = useRouter()

const loginError = ref(false)

const onFormSubmit = () => {
  refVform.value?.validate().then(({ valid }) => {
    if (valid) onSubmit()
  })
}

const onSubmit = async () => {
  formAction.value = { ...formActionDefault, formProcess: true }
  loginError.value = false

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.value.email,
    password: formData.value.password,
  })

  if (error) {
    loginError.value = true
    formAction.value.formErrorMessage = 'Wrong email or password.'
    formAction.value.formStatus = error.status
  } else if (data) {
    formAction.value.formSuccessMessage = 'Successfully Logged In.'
    const user = data.user
    if (user) {
      const role = user.user_metadata?.role
      if (role === 'farmer') router.replace('/list-farm')
      else if (role === 'traveler') router.replace('/discoverfarm')
    }
  }

  refVform.value?.reset()
  formAction.value.formProcess = false
}
</script>

<template>
  <v-app>
    <v-container fluid class="bg-container">
      <v-row justify="center" align="center" style="min-height: 100vh">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="login-card elevation-10">
            <v-card-title class="justify-center">
              <v-img src="/images/AgriVistaLogo.png" max-width="120" class="my-4 mx-auto" />
            </v-card-title>

            <v-card-text>
              <h2 class="text-center mb-6 font-weight-bold">
                Welcome to <span style="color: #f8bd01;">Agri</span><span style="color: #728d5a;">Vista!</span>
              </h2>

              <v-alert
                v-if="loginError"
                type="error"
                class="mb-4"
                border="start"
                color="error"
                variant="tonal"
                elevation="1"
              >
                Wrong email or password.
              </v-alert>

              <v-form ref="refVform" @submit.prevent="onFormSubmit">
                <v-text-field
                  label="Email"
                  variant="outlined"
                  density="comfortable"
                  color="success"
                  :rules="[requiredValidator, emailValidator]"
                  v-model="formData.email"
                />

                <v-text-field
                  label="Password"
                  type="password"
                  variant="outlined"
                  density="comfortable"
                  color="success"
                  :rules="[requiredValidator, passwordValidator]"
                  v-model="formData.password"
                />

                <v-btn
                  type="submit"
                  block
                  class="login-btn mt-4"
                  color="success"
                  :disabled="formAction.formProcess"
                  :loading="formAction.formProcess"
                  elevation="2"
                >
                  <template #default>Log In</template>
                  <template #loading>
                    <v-progress-circular indeterminate color="white" size="24" />
                  </template>
                </v-btn>
              </v-form>

              <p class="text-center mt-6 text-body-2">
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
}

.login-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(6px);
  border-radius: 20px;
  padding: 30px 24px;
  transition: 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.login-card:hover {
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.12);
}

.login-btn {
  border-radius: 25px;
  font-weight: 600;
  font-size: 16px;
  height: 48px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.login-btn:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(45, 125, 70, 0.3);
}

.register-link {
  font-weight: 600;
  color: #2d7d46;
  text-decoration: none;
}

.register-link:hover {
  text-decoration: underline;
}
</style>
