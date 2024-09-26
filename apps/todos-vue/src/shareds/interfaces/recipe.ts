import type { ICreateIngredientList, IIngredient } from './ingredient'

export interface IRecipe {
  id: string
  description: string
  ingredients?: IIngredient[]
  nutritionalValue?: INutritionalValue
  createdAt?: string
  updatedAt?: string
}

export interface INutritionalValue {
  id: string
  protein: number
  fat: number
  carbohydrates: number
  kcal: number
  createdAt?: string
  updatedAt?: string
}

export interface ICreateRecipe {
  description: string
  ingredients: ICreateIngredientList
}

export interface IUpdateRecipe extends ICreateRecipe {}
