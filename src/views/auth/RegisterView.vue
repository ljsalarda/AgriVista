<script setup>
<<<<<<< HEAD
import { requiredValidator, emailValidator, passwordValidator } from '@/utils/validators'
</script>
=======
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { requiredValidator, emailValidator, passwordValidator } from '@/utils/validators'
import { supabase, formActionDefault } from '@/utils/supabase.js'

const router = useRouter()

const fullName = ref('')
const email = ref('')
const password = ref('')

const form = ref({ ...formActionDefault })

const registerTraveler = async () => {
  form.value.formProcess = true
  form.value.formErrorMessage = ''
  form.value.formSuccessMessage = ''

  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        full_name: fullName.value,
        role: 'traveler', 
      },
    },
  })

  if (error) {
    form.value.formStatus = error.status
    form.value.formErrorMessage = error.message
  } else {
    form.value.formSuccessMessage = 'Registration successful! Please verify your email.'
    setTimeout(() => {
      router.replace('/discoverfarm')
    }, 2000)
  }

  form.value.formProcess = false
}
</script>

>>>>>>> f347a4394d4c47c7739304c25150711ce882800c
<template>
  <v-app>
    <v-container fluid class="bg-container d-flex align-center justify-center">
      <v-row justify="center">
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-card class="pa-10 rounded-xl mx-auto text-center" elevation="10" max-width="100%">
            <v-row no-gutters>
              <v-col cols="12" md="5" class="pa-3 d-flex flex-column justify-center">
<<<<<<< HEAD
                <v-img class="mx-auto mb-2" src="/images/AgriVistaLogo.png" width="100"></v-img>
=======
                <v-img class="mx-auto mb-2" src="/images/AgriVistaLogo.png" width="100" />
>>>>>>> f347a4394d4c47c7739304c25150711ce882800c
                <h2 class="text-h6 font-weight-bold mb-2">
                  List your farm and reach more visitors
                </h2>

                <div class="d-flex justify-center my-2">
<<<<<<< HEAD
                  <v-btn icon class="mx-1" variant="outlined" size="small"
                    ><v-icon>mdi-facebook</v-icon></v-btn
                  >
                  <v-btn icon class="mx-1" variant="outlined" size="small"
                    ><v-icon>mdi-google</v-icon></v-btn
                  >
                  <v-btn icon class="mx-1" variant="outlined" size="small"
                    ><v-icon>mdi-apple</v-icon></v-btn
                  >
=======
                  <v-btn icon class="mx-1" variant="outlined" size="small">
                    <v-icon>mdi-facebook</v-icon>
                  </v-btn>
                  <v-btn icon class="mx-1" variant="outlined" size="small">
                    <v-icon>mdi-google</v-icon>
                  </v-btn>
                  <v-btn icon class="mx-1" variant="outlined" size="small">
                    <v-icon>mdi-apple</v-icon>
                  </v-btn>
>>>>>>> f347a4394d4c47c7739304c25150711ce882800c
                </div>

                <p class="text-caption text-grey-darken-1 mb-2">or</p>

<<<<<<< HEAD
                <v-form fast-fail @submit.prevent>
                  <v-text-field
=======
                <v-form fast-fail @submit.prevent="registerTraveler">
                  <v-text-field
                    v-model="fullName"
>>>>>>> f347a4394d4c47c7739304c25150711ce882800c
                    label="Full name"
                    variant="outlined"
                    density="compact"
                    class="mb-2"
                    :rules="[requiredValidator]"
<<<<<<< HEAD
                  ></v-text-field>
                  <v-text-field
=======
                  />
                  <v-text-field
                    v-model="email"
>>>>>>> f347a4394d4c47c7739304c25150711ce882800c
                    label="Email"
                    variant="outlined"
                    density="compact"
                    class="mb-2"
                    :rules="[requiredValidator, emailValidator]"
<<<<<<< HEAD
                  ></v-text-field>
                  <v-text-field
=======
                  />
                  <v-text-field
                    v-model="password"
>>>>>>> f347a4394d4c47c7739304c25150711ce882800c
                    label="Password"
                    type="password"
                    variant="outlined"
                    density="compact"
                    :rules="[requiredValidator, passwordValidator]"
<<<<<<< HEAD
                  ></v-text-field>

                  <v-btn class="mt-3" type="submit" block color="success">Start</v-btn>
=======
                  />

                  <v-btn :loading="form.formProcess" class="mt-3" type="submit" block color="success">
                    Start
                  </v-btn>

                  <div v-if="form.formErrorMessage" class="text-error mt-2">
                    {{ form.formErrorMessage }}
                  </div>
                  <div v-if="form.formSuccessMessage" class="text-success mt-2">
                    {{ form.formSuccessMessage }}
                  </div>
>>>>>>> f347a4394d4c47c7739304c25150711ce882800c
                </v-form>

                <p class="text-caption mt-3">
                  Already have an account?
                  <RouterLink to="/login" class="text-green-darken-2">Log in</RouterLink>
                </p>
              </v-col>

              <v-col cols="12" md="7" class="d-none d-md-block">
                <v-img
                  src="/src/assets/bg2.jpg"
                  class="h-100"
                  cover
                  style="border-radius: 20px"
<<<<<<< HEAD
                ></v-img>
=======
                />
>>>>>>> f347a4394d4c47c7739304c25150711ce882800c
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
