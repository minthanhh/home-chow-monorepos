import { configURL } from '@/config'
import { http } from './http.service'

class UserService {
  async me() {
    return await http.get(configURL.ME)
  }
}

export const userService = new UserService()
