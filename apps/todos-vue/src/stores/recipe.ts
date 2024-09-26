import { ref } from 'vue'
import { defineStore } from 'pinia'
import {  type IRecipe } from '@/shareds/interfaces'
import { recipeService } from '@/shareds/services'
import type { IPaginationMeta } from '@/core/@types'

export const useRecipeStore = defineStore('recipe', () => {
  const recipes = ref<IRecipe[]>([])
  const isRecipesLoading = ref(true)
  const recipesError = ref<string>()
  const paginationMeta = ref<IPaginationMeta | null>(null)

  // #region getIngredients
  const getRecipes = async () => {
    try {
      isRecipesLoading.value = true
      const response = await recipeService.getRecipes()
      recipes.value = response.data.data
      paginationMeta.value = response.data.meta
    } catch (error: any) {
      recipesError.value = error.message
      console.log(error)
    } finally {
      isRecipesLoading.value = false
    }
  }

  const reset = () => {
    isRecipesLoading.value = false
    recipes.value = []
  }

  return {
    recipes,
    isRecipesLoading,
    reset,
    getRecipes
  }
})
