import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import RegisterPick from '@/views/auth/RegisterPick.vue'
import RegisterViewFarmer from '@/views/auth/RegisterViewFarmer.vue'
import ListFarm from '@/views/Farmer/ListFarm.vue'
import PuchasesBooks from '@/views/Farmer/PuchasesBooks.vue'
import ListProduct from '@/views/Farmer/ListProduct.vue'
import FarmerAccountView from '@/views/Farmer/FarmerAccountView.vue'
import DiscoverFarm from '@/views/Traveler/DiscoverFarm.vue'
import VisitFarm from '@/views/Traveler/VisitFarm.vue'
import TravelerAccount from '@/views/Traveler/TravelerAccount.vue'
import BuyLocalProducts from '@/views/Traveler/BuyLocalProducts.vue'
import Landing from '@/views/LandingPage/Landing.vue'
import PurchasesBooksHistory from '@/views/Farmer/PurchasesBooksHistory.vue'
import OrdersBooksHistory from '@/views/Traveler/OrdersBooksHistory.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home', 
      component: Landing,
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
    {
      path: '/list-farm',
      name: 'list-farm',
      component: ListFarm,
    },
    {
      path: '/PuchasesBooks',
      name: 'PuchasesBooks',
      component: PuchasesBooks,
    },
    {
      path: '/list-products',
      name: 'list-products',
      component: ListProduct,
    },
    {
      path: '/farmeraccount',
      name: 'farmer-account',
      component: FarmerAccountView, 
    },
    {
      path: '/discoverfarm',
      name: 'discover-farm',
      component: DiscoverFarm, 
    },
    {
      path: '/visitfarm',
      name: 'visit-farm',
      component: VisitFarm, 
    },
    {
      path: '/traveleraccount',
      name: 'traveler-account',
      component: TravelerAccount, 
    },
    {
      path: '/buylocalproducts',
      name: 'buylocal-products',
      component: BuyLocalProducts, 
    },
    {
      path: '/landing',
      name: 'landing',
      component: Landing, 
    },
    {
      path: '/PBhistory',
      name: 'PBhistory',
      component: PurchasesBooksHistory, 
    },
    {
      path: '/OBhistory',
      name: 'OBhistory',
      component: OrdersBooksHistory, 
    },
  ],
})

export default router
