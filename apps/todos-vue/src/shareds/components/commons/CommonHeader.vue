<script setup lang="ts">
import { useLocale } from 'vuetify'
import { useRouter } from 'vue-router'
import { userUserStore } from '@/stores'
// import { authenticateService } from '../../services/authenticate.service'

const { t } = useLocale()
const router = useRouter()
const { logout } = userUserStore()

const onLogout = async () => {
  // const response = await authenticateService.logout()
  localStorage.clear()
  logout()
  router.push('/login')
}
</script>

<template>
  <header class="w-full flex items-center justify-between h-14 shadow-md px-4">
    <v-img
      aspect-ratio="16/9"
      :max-width="120"
      src="https://homechow.co/wp-content/uploads/2023/02/Group-34502.svg"
    />
    <v-btn @click="onLogout">{{ t('$vuetify.common_btn_logout_title') }}</v-btn>
  </header>
</template>
