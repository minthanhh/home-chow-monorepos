<script setup lang="ts">
import TodoList from '@/features/todo/TodoList.vue'
import { authenticateService } from '../shareds/services/authenticate.service'

const loginWithGoogle = async () => {
  await authenticateService.loginWithGoogle()
}
</script>

<template>
  <div class="flex w-full items-center justify-center">
    <TodoList />
    <button @click="loginWithGoogle">Login with google</button>
  </div>
</template>
