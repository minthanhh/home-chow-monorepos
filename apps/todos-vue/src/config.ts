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
  ME: 'users/me'
}
