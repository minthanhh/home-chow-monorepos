import { configURL } from '@/config'
import { http } from './http.service'
import type { ICreateMeal, IUpdateMeal } from '../interfaces'

class MealService {
  async getMeals() {
    return await http.get(configURL.GET_MEALS)
  }

  async getMealById(mealId: string) {
    return await http.get(`${configURL.GET_MEAL}/${mealId}`)
  }

  async createMeal(meal: ICreateMeal) {
    return await http.post(`${configURL.CREATE_MEAL}`, meal)
  }

  async updateMeal(mealId: string, meal: IUpdateMeal) {
    return await http.put(`${configURL.UPDATE_MEAL}/${mealId}`, meal)
  }

  async deleteMeal(mealId: string) {
    return await http.delete(`${configURL.DELETE_MEAL}/${mealId}`)
  }
}

export const mealService = new MealService()
