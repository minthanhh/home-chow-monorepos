import { BASE_API_URL, configURL } from '@/config'
import { configure } from 'axios-hooks'
import axios from 'axios'
import { userUserStore } from '@/stores'

const http = axios.create({
  baseURL: BASE_API_URL
})

export function initializeInterceptors(userStore: ReturnType<typeof userUserStore>) {
  let isRefreshing = false
  const { initializeToken, logout } = userStore

  http.interceptors.request.use(
    async (config) => {
      const token = {
        accessToken: localStorage.getItem('access_token'),
        refreshToken: localStorage.getItem('refresh_token')
      }

      if (token?.accessToken) {
        config.headers.Authorization = `Bearer ${isRefreshing ? token.refreshToken : token?.accessToken}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  http.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config

      if (error.code === 'ERR_NETWORK') {
        window.localStorage.clear()
        logout()
        return Promise.reject(error)
      }

      if (error.response.status === 401 && !originalRequest._retry && !isRefreshing) {
        originalRequest._retry = true
        isRefreshing = true

        try {
          const response = await http.post(configURL.REFRESH_TOKEN)
          const accessToken = response.data.accessToken
          // Update the Authorization header with the new access token
          localStorage.setItem('access_token', accessToken)
          http.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`
          initializeToken(accessToken)

          // Retry the original request with the new access token
          return http(originalRequest)
        } catch (refreshError) {
          // Handle token refresh failure
          window.localStorage.clear()
          logout()
          return Promise.reject(refreshError)
        }
      }
      isRefreshing = false
      return Promise.reject(error)
    }
  )
}

configure({ axios: http })
export { http }
