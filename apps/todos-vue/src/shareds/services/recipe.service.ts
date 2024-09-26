import { configURL } from '@/config'
import { http } from './http.service'
import type { IUpdateRecipe, ICreateRecipe } from '../interfaces'

class RecipeService {
  async getRecipes() {
    return await http.get(configURL.GET_RECIPES)
  }

  async getRecipe(recipeId: string) {
    return await http.get(`${configURL.GET_RECIPE}/${recipeId}`)
  }

  async createRecipe(ingredient: ICreateRecipe) {
    return await http.post(`${configURL.CREATE_INGREDIENT}`, ingredient)
  }

  async updateRecipe(recipeId: string, meal: IUpdateRecipe) {
    return await http.put(`${recipeId}/${configURL.UPDATE_INGREDIENT}`, meal)
  }

  async deleteRecipe(recipeId: string) {
    return await http.delete(`${configURL.DELETE_INGREDIENT}/${recipeId}`)
  }
}

export const recipeService = new RecipeService()
