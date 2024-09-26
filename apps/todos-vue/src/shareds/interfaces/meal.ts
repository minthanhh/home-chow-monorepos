import type { ICuisine } from './cuisine'
import type { IIngredient } from './ingredient'
import type { IRecipe } from './recipe'
import type { IUser } from './user'

export interface IMeal {
  id?: string
  name: string
  recipe: IRecipe
  cuisine: ICuisine
  createdBy: ICreatedBy
  preferredBy?: []
  updatedAt?: string
  createdAt?: string
}

export interface ICreatedBy {
  id: string
  avatar: null | string
  fullName: null | string
  username: string
}

export interface ICreateMealStore {
  name: string
  cuisine: ICuisine
  recipe: IRecipe
}

export interface ICreateMeal {
  name: string
  cuisineId: string
  recipeId: string
  recipeDescription: string
  ingredients: IIngredient[]
}

export interface IUpdateMeal extends ICreateMeal {}

export class MealModel {
  static toStore(createMeal: ICreateMealStore, user: IUser | null): IMeal {
    return {
      name: createMeal.name,
      cuisine: createMeal.cuisine,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      recipe: createMeal.recipe,
      createdBy: {
        avatar: user!.avatar,
        fullName: user!.fullName,
        id: user!.id,
        username: user!.username
      }
    }
  }

  static toApi(createMeal: ICreateMealStore) {
    return {
      name: createMeal.name,
      cuisineId: createMeal.cuisine.id,
      recipeId: createMeal.recipe.id,
      ingredients: createMeal.recipe.ingredients,
      recipeDescription: createMeal.recipe.description
    }
  }
}
