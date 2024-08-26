import { configURL } from '@/config'
import { http } from './http.service'
import type { ICreateTodo, IUpdateTodo } from '../interfaces'

class TodoService {
  async getTodos() {
    return await http.get(configURL.GET_TODOS)
  }

  async getTodo(todoId: string) {
    return await http.get(`${configURL.GET_TODO}/${todoId}`)
  }

  async createTodo(todo: ICreateTodo) {
    return await http.post(configURL.CREATE_TODO, todo)
  }

  async updateTodo({ id: todoId, ...todo }: IUpdateTodo) {
    return await http.put(`${configURL.UPDATE_TODO}/${todoId}`, todo)
  }

  async deleteTodo(todoId: string) {
    return await http.delete(`${configURL.DELETE_TODO}/${todoId}`)
  }
}

export const todoService = new TodoService()
