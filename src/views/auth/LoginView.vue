<script setup>
import { ref } from 'vue';
</script>

<template>
  <v-app>
    <v-container fluid class="bg-container">
      <v-row justify="center" align="center" style="min-height: 100vh;">
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
              <v-form @submit.prevent>
                <v-text-field label="Email" variant="outlined" density="comfortable"></v-text-field>
                <v-text-field label="Password" type="password" variant="outlined" density="comfortable"></v-text-field>
                <v-btn type="submit" block class="login-btn" color="success">Log In</v-btn>
              </v-form>
              <p class="text-center mt-4">Don't have an account? <RouterLink to="/register-pick" class="register-link">Register</RouterLink></p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style scoped>
.bg-container {
  background: url('@/assets/bgg.jpg') no-repeat center center;
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
