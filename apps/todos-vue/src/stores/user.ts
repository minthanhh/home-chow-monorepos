import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IUser } from '@/shareds/interfaces'

export const userUserStore = defineStore('user', () => {
  const user = ref<IUser | null>(null)
  const isAuthenticated = ref<boolean>(false)
  const accessToken = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)

  const setUser = (userInfo: IUser) => {
    user.value = userInfo
    isAuthenticated.value = true
  }

  const initializeToken = (access?: string, refresh?: string) => {
    accessToken.value = access || localStorage.getItem('access_token')
    refreshToken.value = refresh || localStorage.getItem('refresh_token')
  }

  const logout = () => {
    user.value = null
    isAuthenticated.value = false
    accessToken.value = null
    refreshToken.value = null
  }

  return { user, setUser, isAuthenticated, logout, accessToken, refreshToken, initializeToken }
})
