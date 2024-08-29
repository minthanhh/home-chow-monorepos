import { BASE_API_URL } from '@/config'
import { configure } from 'axios-hooks'
import axios from 'axios'

const http = axios.create({
  baseURL: BASE_API_URL
})

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

configure({ axios: http })
export { http }
