import { http } from './shareds/services'

export const BASE_API_URL = 'http://localhost:3000/apis/'

export const configURL = {
  // TODO: to test server apis
  GET_TODOS: 'todos/get-todos',
  GET_TODO: 'todos/get-todo',
  CREATE_TODO: 'todos/create-todo',
  UPDATE_TODO: 'todos/update-todo',
  DELETE_TODO: 'todos/delete-todo',

  // TODO: authenticate
  LOGIN: 'users/login',
  LOGOUT: 'users/logout',
  REGISTER: 'users/register',
  FORGOT_PASSWORD: 'users/forgot-password',
  RESET_PASSWORD: 'users/reset-password',
  LOGIN_GOOGLE: 'users/login-with-google',
  LOGIN_GITHUB: 'users/github',
  REFRESH_TOKEN: 'users/refresh-token',

  // TODO: user
  ME: 'users/me',

  UPDATE_MEAL: 'meals',
  CREATE_MEAL: 'meals',
  GET_MEAL: 'meals',
  GET_MEALS: 'meals',
  DELETE_MEAL: 'meals',

  // TODO: meals
  UPDATE_INGREDIENT: 'ingredients',
  GET_INGREDIENTS_BY_RECIPE_ID: 'ingredients/recipe',
  CREATE_INGREDIENT: 'ingredients',
  GET_INGREDIENT: 'ingredients',
  GET_INGREDIENTS: 'ingredients',
  DELETE_INGREDIENT: 'ingredients',

  // TODO: recipe
  UPDATE_RECIPE: 'recipes',
  CREATE_RECIPE: 'recipes',
  GET_RECIPE: 'recipes',
  GET_RECIPES: 'recipes',
  DELETE_RECIPE: 'recipes',

  // TODO: cuisine
  UPDATE_CUISINE: 'cuisines',
  CREATE_CUISINE: 'cuisines',
  GET_CUISINE: 'cuisines',
  GET_CUISINES: 'cuisines',
  DELETE_CUISINE: 'cuisines',

  // TODO: upload
  UPLOAD_IMAGE: 'upload/image',
  UPLOAD_IMAGES: 'upload/images'
}

export const parseImage = async (imageId: string) => {
  try {
    const response = await http.get(`todos/upload/image/${imageId}`, {
      responseType: 'arraybuffer'
    })

    console.log('helo', response)

    const byteArray = new Uint8Array(response.data)
    // const blob = new Blob([byteArray], { type: 'image/png' })

    // console.log('blob', blob)
    // console.log('URL.createObjectURL(blob)', URL.createObjectURL(blob))
    return ''
  } catch (error) {
    console.log('ERROR:', error)
  }
}
