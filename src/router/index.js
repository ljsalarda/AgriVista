import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import RegisterPick from '@/views/auth/RegisterPick.vue'
import RegisterViewFarmer from '@/views/auth/RegisterViewFarmer.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home', 
      component: LoginView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView, 
    },
    {
      path: '/register',
      name: 'register',
       component: RegisterView,
    },
    {
      path: '/register-pick', 
      name: 'register-pick',
      component: RegisterPick,
    },
    {
      path: '/registerfarmer',
      name: 'registerfarmer',
      component: RegisterViewFarmer,
    },
  ],
})

export default router
