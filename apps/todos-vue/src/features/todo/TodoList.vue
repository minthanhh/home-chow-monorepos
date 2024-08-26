<script setup lang="ts">
import TodoItem from './TodoItem.vue'
import { useTodoStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useLocale } from 'vuetify'
const todoStore = useTodoStore()
const { $fetchTodos, addTodo, deleteTodo, updateTodo } = todoStore
const todoTitle = ref<string>('')
const hasTodoIdEdit = ref<string>('')

const { loading, todos } = storeToRefs(todoStore)

onMounted(() => $fetchTodos())

const onAddTodo = async () => {
  if (!todoTitle.value) return

  if (hasTodoIdEdit.value) {
    await updateTodo({ id: hasTodoIdEdit.value, title: todoTitle.value })
  } else {
    await addTodo({ title: todoTitle.value })
  }
  todoTitle.value = ''
  hasTodoIdEdit.value = ''
}

const onEditTodo = async (todoId: string) => {
  if (!todoId) return
  const todo = todos.value.find((todo) => todo.id === todoId)
  if (!todo) return
  hasTodoIdEdit.value = todoId
  todoTitle.value = todo.title
}

const onDeleteTodo = async (todoId: string) => await deleteTodo(todoId)

const { t } = useLocale()
</script>

<template>
  <div class="flex flex-col items-center mt-20">
    <div class="flex items-center justify-between w-full mb-10">
      <h1 class="text-2xl">Todo List</h1>
      <h2>{{ t('$vuetify.common_title') }}</h2>
      <div class="flex items-center gap-2">
        <input v-model="todoTitle" type="text" class="border p-1 rounded" />
        <button
          @click="onAddTodo"
          class="bg-gray-500 py-1 px-6 text-white transition-colors hover:bg-gray-400 duration-150 ease-in-out rounded"
        >
          {{ loading ? '...Loading' : 'Add' }}
        </button>
      </div>
    </div>
    <ul class="flex flex-col bg-white rounded-md p-2 shadow-md w-[600px]">
      <TodoItem
        v-for="todo of todos"
        :key="todo.id"
        :todo="todo"
        :loading="loading"
        :on-delete-todo="onDeleteTodo"
        :on-edit-todo="onEditTodo"
      />
    </ul>
  </div>
</template>
