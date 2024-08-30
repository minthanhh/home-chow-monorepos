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

const handleRefreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken')

    const response = await http.post(configURL.REFRESH_TOKEN, null, {
      headers: {
        Authorization: 'Bearer ' + refreshToken
      }
    })

    const accessToken = response.data.accessToken
    localStorage.setItem('access_token', accessToken)
    return accessToken
  } catch (error) {
    window.localStorage.clear()
    router.push({ name: 'authenticate' })
    throw error
  }
}

router.beforeEach(async (to) => {
  const { accessToken, refreshToken, setUser, user, initializeToken, isAuthenticated } =
    userUserStore()

  if ((!accessToken || !refreshToken) && to.name !== 'authenticate') {
    return { name: 'authenticate', replace: true }
  }

  if (!user && accessToken && refreshToken && to.name !== 'authenticate') {
    try {
      const response = await userService.me()
      setUser(response.data)
      return { name: 'home', replace: true }
    } catch (error) {
      try {
        const refreshToken = localStorage.getItem('refreshToken')

        const response = await http.post(configURL.REFRESH_TOKEN, null, {
          headers: {
            Authorization: 'Bearer ' + refreshToken
          }
        })

        const accessToken = response.data.accessToken
        localStorage.setItem('access_token', accessToken)
        initializeToken(accessToken)
        return { name: 'home', replace: true }
      } catch (error) {
        window.localStorage.clear()
        return { name: 'authenticate', replace: true }
      }
    }
  }

  if (user && accessToken && refreshToken && to.name !== 'authenticate') {
    return { name: 'home' }
  }
})

export default router
