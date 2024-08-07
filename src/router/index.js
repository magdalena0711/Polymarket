import { createRouter, createWebHistory } from 'vue-router'
import RegisterPage from '@/views/RegisterPage.vue'
import AboutPage from '@/views/AboutPage.vue'

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
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
