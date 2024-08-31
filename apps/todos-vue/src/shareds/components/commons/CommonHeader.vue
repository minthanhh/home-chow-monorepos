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
  <header class="flex items-center justify-center h-14 shadow-md px-4">
    <div class="ml-auto">
      <v-btn @click="onLogout">{{ t('$vuetify.common_btn_logout_title') }}</v-btn>
    </div>
  </header>
</template>
