import { configURL } from '@/config'
import { http } from './http.service'
import type { IUpdateRecipe, ICreateRecipe } from '../interfaces'

class CuisineService {
  async getCuisines() {
    return await http.get(configURL.GET_CUISINES)
  }

  async getCuisine(cuisineId: string) {
    return await http.get(`${configURL.GET_CUISINE}/${cuisineId}`)
  }

  async createCuisine(ingredient: ICreateRecipe) {
    return await http.post(`${configURL.CREATE_CUISINE}`, ingredient)
  }

  async updateCuisine(cuisineId: string, meal: IUpdateRecipe) {
    return await http.put(`${cuisineId}/${configURL.UPDATE_CUISINE}`, meal)
  }

  async deleteCuisine(cuisineId: string) {
    return await http.delete(`${configURL.DELETE_CUISINE}/${cuisineId}`)
  }
}

export const cuisineService = new CuisineService()
