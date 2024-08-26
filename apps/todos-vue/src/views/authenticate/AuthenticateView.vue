<template>
  <div class="flex items-center w-full h-screen justify-center">
    <div class="flex flex-col gap-10">
      <text-h2>{{ t('$vuetify.common_login_title') }}</text-h2>

      <v-form class="w-[600px]">
        <v-text-field
          :label="t('$vuetify.common_form_label_username_or_email')"
          :placeholder="t('$vuetify.common_form_placeholder_title_username_or_email')"
          variant="outlined"
        ></v-text-field>
        <v-text-field
          :label="t('$vuetify.common_form_label_password')"
          :placeholder="t('$vuetify.common_form_placeholder_title_password')"
          variant="outlined"
        ></v-text-field>
      </v-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AuthenTab } from '@/features/authenticate'
import { ref } from 'vue'
import { useLocale } from 'vuetify'
const { t } = useLocale()
const authenTabs = ref<AuthenTab>('login')
</script>
