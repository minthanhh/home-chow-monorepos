import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IUser } from '@/shareds/interfaces'

export const userUserStore = defineStore('user', () => {
  const user = ref<IUser | null>(null)

  const setUser = (userInfo: IUser) => {
    user.value = userInfo
  }

  console.log('USER', user.value)

  return { user, setUser }
})
