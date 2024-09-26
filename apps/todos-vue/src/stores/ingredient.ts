import { ref } from 'vue'
import { defineStore } from 'pinia'
import { IngredientModel, type ICreateIngredient, type IIngredient } from '@/shareds/interfaces'
import { ingredientService } from '@/shareds/services'
import type { IPaginationMeta } from '@/core/@types'

export const useIngredientStore = defineStore('ingredient', () => {
  const ingredients = ref<IIngredient[]>([])
  const isIngredientsLoading = ref(true)
  const ingredientsError = ref<string>()
  const paginationMeta = ref<IPaginationMeta | null>(null)

  const ingredientByRecipe = ref<IIngredient[]>([])
  const paginationMetaIngredientByRecipe = ref<IPaginationMeta | null>(null)
  const ingredientByRecipeLoading = ref(true)
  const ingredientByRecipeError = ref<string>()

  // #region getIngredients
  const $getIngredients = async () => {
    try {
      isIngredientsLoading.value = true
      const response = await ingredientService.getIngredients()
      const newIngredients = response.data.data as IIngredient[]

      if (ingredientByRecipe.value.length) {
        const recipeSet = new Set(ingredientByRecipe.value.map((i) => i.id))
        ingredients.value = [...ingredients.value, ...newIngredients].filter(
          (i) => !recipeSet.has(i.id)
        )
      } else {
        ingredients.value.push(...newIngredients)
      }
      paginationMeta.value = response.data.meta
    } catch (error: any) {
      ingredientsError.value = error.message
      console.log(error)
    } finally {
      isIngredientsLoading.value = false
    }
  }

  // #region getIngredientByRecipeId
  const $getIngredientByRecipe = async (recipeId: string) => {
    try {
      ingredientByRecipeLoading.value = true
      const response = await ingredientService.getIngredientsByRecipeId(recipeId)
      ingredientByRecipe.value.push(...response.data.data)
      paginationMetaIngredientByRecipe.value = response.data.meta
    } catch (error: any) {
      ingredientByRecipeError.value = error.message
      console.log(error)
    } finally {
      ingredientByRecipeLoading.value = false
    }
  }

  // #region createIngredient
  const $createIngredient = async (createIngredient: ICreateIngredient) => {
    const originalIngredients = [...ingredients.value]
    const originalIngredientByRecipe = [...ingredientByRecipe.value]
    try {
      isIngredientsLoading.value = true
      const response = await ingredientService.createIngredient(
        IngredientModel.toApi(createIngredient)
      )

      console.log('response', response.data)

      ingredients.value = [IngredientModel.toStore(createIngredient), ...originalIngredients]
      ingredientByRecipe.value = [
        IngredientModel.toStore(createIngredient),
        ...originalIngredientByRecipe
      ]
    } catch (error: any) {
      ingredients.value = originalIngredients
      ingredientByRecipe.value = originalIngredientByRecipe
      console.error('Meal Error: ', error.message)
      console.error('Meal Error Stack: ', error)
    } finally {
      isIngredientsLoading.value = false
    }
  }

  const addIngredientsToRecipe = (ings: IIngredient[]) => {
    ingredientByRecipe.value = [...ings, ...ingredientByRecipe.value]
    const recipeSet = new Set(ings.map((i) => i.id))
    ingredients.value = [...ingredients.value].filter((i) => !recipeSet.has(i.id))
  }

  const deleteOneOrManyIngredientsInRecipe = (deleteType: 'many' | 'one', index?: number) => {
    const originals = [...ingredientByRecipe.value]

    if (deleteType === 'many') {
      ingredientByRecipe.value = []
      ingredients.value.unshift(...originals)
      return
    }
    const [deletedIng] = originals.splice(index!, 1)
    ingredientByRecipe.value = originals
    ingredients.value = [deletedIng, ...ingredients.value]
  }

  const reset = () => {
    isIngredientsLoading.value = false
    ingredients.value = []
  }

  return {
    // TODO: state
    ingredients,
    isIngredientsLoading,
    ingredientByRecipe,
    paginationMetaIngredientByRecipe,
    ingredientByRecipeLoading,
    ingredientByRecipeError,
    reset,

    // TODO: Interactive apis handler
    $getIngredients,
    $createIngredient,
    $getIngredientByRecipe,

    // TODO: Local handlers
    addIngredientsToRecipe,
    deleteOneOrManyIngredientsInRecipe
  }
})
