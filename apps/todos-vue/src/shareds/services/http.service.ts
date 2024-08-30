import { BASE_API_URL, configURL } from '@/config'
import { configure } from 'axios-hooks'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { userUserStore } from '../../stores/user'
const router = useRouter()

const http = axios.create({
  baseURL: BASE_API_URL
})

export function initializeInterceptors(userStore: ReturnType<typeof userUserStore>) {
  http.interceptors.request.use(
    async (config) => {
      const token = {
        accessToken: localStorage.getItem('access_token'),
        refreshToken: localStorage.getItem('refresh_token')
      }

      if (token?.accessToken) {
        config.headers.Authorization = `Bearer ${token?.accessToken}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  http.interceptors.response.use(
    (response) => response,
    async (error) => {
      return Promise.reject(error)
    }
  )
}

configure({ axios: http })
export { http }
