// Store setup using Pinia
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { todoService } from '@/shareds/services'
import type { ICreateTodo, ITodo, IUpdateTodo } from '@/shareds/interfaces'

export const useTodoStore = defineStore('todo', () => {
  const loading = ref<boolean>(true)
  const todos = ref<ITodo[]>([])

  // #region Add todo
  async function addTodo(todo: ICreateTodo) {
    loading.value = true
    try {
      const response = await todoService.createTodo(todo)
      console.log('Add response', response)

      const newTodo = {
        id: response.data.todoId,
        title: todo.title,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      todos.value.push(newTodo)
    } catch (error) {
      console.error('Failed to add todo:', error)
    } finally {
      loading.value = false
    }
  }

  // #region Update todo
  async function updateTodo(todoUpdated: IUpdateTodo) {
    const { id: todoId, title } = todoUpdated

    loading.value = true
    try {
      const todo = todos.value.find((todo) => todo.id === todoId)
      if (todo) {
        todo.title = title
        todo.updatedAt = new Date().toISOString()
        await todoService.updateTodo(todoUpdated)
      } else {
        console.warn(`Todo with id ${todoId} not found`)
      }
    } catch (error) {
      console.error('Failed to update todo:', error)
    } finally {
      loading.value = false
    }
  }

  // #region Delete todo
  async function deleteTodo(id: string) {
    loading.value = true
    try {
      const index = todos.value.findIndex((todo) => todo.id === id)
      if (index !== -1) {
        todos.value.splice(index, 1)
        await todoService.deleteTodo(id)
      } else {
        console.warn(`Todo with id ${id} not found`)
      }
    } catch (error) {
      console.error('Failed to delete todo:', error)
    } finally {
      loading.value = false
    }
  }

  // #region Fetch todo
  async function $fetchTodos() {
    loading.value = true
    try {
      console.log('Fetching todos...')
      const response = await todoService.getTodos()
      console.log('Fetch response', response)
      todos.value = response.data as ITodo[]
    } catch (error) {
      console.error('Failed to fetch todos:', error)
    } finally {
      loading.value = false
    }
  }

  return { todos, addTodo, updateTodo, deleteTodo, $fetchTodos, loading }
})
