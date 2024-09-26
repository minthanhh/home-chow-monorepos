import { configURL } from '@/config'
import { http } from './http.service'
import type { ICreateIngredient, IUpdateIngredient } from '../interfaces'

class IngredientService {
  async getIngredients() {
    return await http.get(configURL.GET_INGREDIENTS)
  }

  async getIngredientsByRecipeId(recipeId: string) {
    return await http.get(`${configURL.GET_INGREDIENTS_BY_RECIPE_ID}/${recipeId}`)
  }

  async createIngredient(ingredient: ICreateIngredient) {
    return await http.post(`${configURL.CREATE_INGREDIENT}`, ingredient)
  }

  async updateIngredient(meal: IUpdateIngredient) {
    return await http.post(`${configURL.UPDATE_INGREDIENT}`, meal)
  }
}

export const ingredientService = new IngredientService()
