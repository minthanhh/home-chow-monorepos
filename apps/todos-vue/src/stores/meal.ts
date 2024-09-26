import { ref } from 'vue'
import { defineStore } from 'pinia'
import { MealModel, type ICreateMealStore, type IMeal } from '@/shareds/interfaces'
import { mealService } from '@/shareds/services'
import type { IPaginationMeta } from '@/core/@types'
import { userUserStore } from './user'

export const useMealStore = defineStore('meal', () => {
  const meals = ref<IMeal[]>([])
  const isMealsLoading = ref(true)
  const paginationMeta = ref<IPaginationMeta | null>(null)
  const { user } = userUserStore()

  const mealDetailsLoading = ref(true)
  const mealDetails = ref<IMeal | null>(null)
  const mealDetailsError = ref<string>()

  // #region getMeals
  const getMeals = async () => {
    try {
      isMealsLoading.value = true
      const response = await mealService.getMeals()
      meals.value = response.data.data
      paginationMeta.value = response.data.meta
    } catch (error) {
      console.log(error)
    } finally {
      isMealsLoading.value = false
    }
  }

  // #region createMeal
  const createMeal = async (createMeal: ICreateMealStore) => {
    const originalMeals = [...meals.value]
    try {
      isMealsLoading.value = true
      await mealService.createMeal(MealModel.toApi(createMeal))
      meals.value = [MealModel.toStore(createMeal, user), ...originalMeals]
    } catch (error: any) {
      meals.value = originalMeals
      console.error('Meal Error: ', error.message)
    } finally {
      isMealsLoading.value = false
    }
  }

  // #region getDetails
  const getDetails = async (mealId: string) => {
    try {
      mealDetailsLoading.value = true
      const response = await mealService.getMealById(mealId)
      mealDetails.value = response.data
    } catch (error: any) {
      mealDetailsError.value = error.message
      console.error('Meal Details Error: ', error.message)
    } finally {
      mealDetailsLoading.value = false
    }
  }

  const reset = () => {
    isMealsLoading.value = false
    meals.value = []
    mealDetails.value = null
  }

  return { meals, isMealsLoading, mealDetails, reset, getMeals, createMeal, getDetails }
})
