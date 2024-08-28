import { BASE_API_URL, configURL } from '@/config'
import type { ILogin, IRegister } from '../interfaces'
import { http } from './http.service'

class AuthenticateService {
  async login(user: ILogin) {
    return await http.post(configURL.LOGIN, user)
  }

  async register(user: IRegister) {
    return await http.post(configURL.REGISTER, user)
  }

  async loginWithGoogle() {
    window.location.href = `${BASE_API_URL}${configURL.LOGIN_GOOGLE}`
  }

  async forgotPassword() {}

  async resetPassword() {}
}

export const authenticateService = new AuthenticateService()
