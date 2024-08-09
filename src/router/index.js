import { createRouter, createWebHistory } from 'vue-router'
import RegisterPage from '@/views/RegisterPage.vue'
import AboutPage from '@/views/AboutPage.vue'
import MyHome from '@/views/MyHome.vue'

const routes = [
  {
    path: '/',
    name: 'registration',
    component: RegisterPage
  },
  {
    path: '/about',
    name: 'about',
    component: AboutPage
  },
  {
    path: '/home',
    name: 'home',
    component: MyHome
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
