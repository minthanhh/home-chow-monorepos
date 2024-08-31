import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthenticateView from '@/views/authenticate/AuthenticateView.vue'
import { userUserStore } from '@/stores'
import { authenticateService, http, userService } from '@/shareds/services'
import { AxiosError } from 'axios'
import { configURL } from '@/config'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'authenticate',
      component: AuthenticateView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach(async (to) => {
  const { accessToken, refreshToken, setUser, user } = userUserStore()

  if ((!accessToken || !refreshToken) && !user && to.name !== 'authenticate') {
    return { name: 'authenticate', replace: true }
  }

  if (!user && accessToken && refreshToken) {
    try {
      const response = await userService.me()
      setUser(response.data)
      return { name: 'home', replace: true }
    } catch (error: any) {
      if (error.code === 'ERR_NETWORK') {
        return { name: 'authenticate', replace: true }
      }
    }
  }

  if (user && accessToken && refreshToken && to.name === 'authenticate') {
    return { name: 'home' }
  }
})

export default router
