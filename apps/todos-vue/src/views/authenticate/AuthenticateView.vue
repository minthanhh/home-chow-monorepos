<script setup lang="ts">
import type { AuthenTab } from '@/features/authenticate'
import { computed, ref } from 'vue'
import { useLocale } from 'vuetify'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, useField } from 'vee-validate'
import { mdiEmailOutline, mdiLockOutline } from '@mdi/js'
import * as zod from 'zod'
import { authenticateService, userService } from '@/shareds/services'
import { AxiosError } from 'axios'
import { userUserStore } from '@/stores'

const { t } = useLocale()
const { setUser } = userUserStore()

const { handleSubmit, setFieldError, resetForm } = useForm({
  validationSchema: toTypedSchema(
    zod.object({
      email: zod
        .string({ message: t('$vuetify.common_form_validate_username_or_email_required') })
        .min(1, { message: t('$vuetify.common_form_validate_username_or_email_required') })
        .email({ message: t('$vuetify.common_form_validate_email') })
        .default('hello5@gmail.com'),
      password: zod
        .string({ message: t('$vuetify.common_form_validate_password_requied') })
        .min(1, { message: t('$vuetify.common_form_validate_password_requied') })
        .default('Hello5_123')
    })
  )
})

const email = useField('email')
const password = useField('password')

const authenTabs = ref<AuthenTab>('login')
const loading = ref<boolean>(false)
const failedMessage = ref<string>('')
const isFailed = computed(() => !!failedMessage.value)

const submit = handleSubmit(async (values) => {
  const { email, password } = values
  loading.value = true

  try {
    const response = await authenticateService.login({ username: email, password })

    if (response.status === 200) {
      const { accessToken, refreshToken } = response.data
      localStorage.setItem('access_token', accessToken)
      localStorage.setItem('refresh_token', refreshToken)

      const userResponse = await userService.me()
      setUser(userResponse.data)
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        setFieldError('password', error?.response?.data?.message)
      } else {
        failedMessage.value = error.message
      }
    }
  } finally {
    loading.value = false
    resetForm()
  }
})
</script>

<template>
  <div class="flex w-full h-screen justify-center bg-gray-50 relative">
    <div class="flex items-start gap-20 mt-60">
      <div>
        <div class="text-h2">Homechow Dashboard</div>
        <p class="text-left">{{ t('$vuetify.common_authenticate_description') }}</p>
      </div>

      <div class="flex flex-col h-max gap-10 bg-white p-4 rounded shadow-lg">
        <v-form class="w-[400px] flex flex-col gap-2" @submit.prevent="submit">
          <v-text-field
            v-model="email.value.value"
            :prepend-inner-icon="mdiEmailOutline"
            :error-messages="email.errorMessage.value"
            :label="t('$vuetify.common_form_label_username_or_email')"
            :placeholder="t('$vuetify.common_form_placeholder_title_username_or_email')"
            variant="outlined"
          ></v-text-field>
          <v-text-field
            v-model="password.value.value"
            :prepend-inner-icon="mdiLockOutline"
            :error-messages="password.errorMessage.value"
            :label="t('$vuetify.common_form_label_password')"
            :placeholder="t('$vuetify.common_form_placeholder_title_password')"
            variant="outlined"
          ></v-text-field>
          <v-btn
            :disabled="loading"
            :loading="loading"
            class="mt-6 text-uppercase font-weight-bold"
            type="submit"
          >
            {{ t('$vuetify.common_btn_login_title') }}
          </v-btn>
        </v-form>
      </div>
    </div>
  </div>

  <v-snackbar v-model="isFailed" multi-line>
    {{ failedMessage }}
    <template v-slot:actions>
      <v-btn color="red" variant="text" @click="failedMessage = ''"> Close </v-btn>
    </template>
  </v-snackbar>
</template>
