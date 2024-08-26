<script setup lang="ts">
import type { ITodo } from '@/shareds/interfaces'

interface Props {
  todo: ITodo
  onDeleteTodo: (todoId: string) => void
  onEditTodo: (todoId: string) => void
  loading: boolean
}
defineProps<Props>()
</script>

<template>
  <div
    class="flex items-center gap-2 rounded shadow-md p-2 w-full hover:bg-gray-100 transition-colors duration-150 ease-in"
  >
    <h2 class="flex-1 font-semibold">{{ todo.title }}</h2>
    <p>{{ new Date(todo.createdAt).toLocaleDateString() }}</p>
    <v-btn
      rounded="xs"
      elevation="4"
      :loading="loading"
      :disabled="loading"
      size="x-small"
      @click="onDeleteTodo(todo.id)"
      >Delete</v-btn
    >
    <v-btn
      rounded="xs"
      elevation="4"
      :disabled="loading"
      :loading="loading"
      size="x-small"
      @click="onEditTodo(todo.id)"
      >Edit</v-btn
    >
  </div>
</template>
