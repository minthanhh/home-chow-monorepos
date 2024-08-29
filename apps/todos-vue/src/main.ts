import './assets/main.css'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router'
import { i18n, locale, theme } from './core/plugins'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

const app = createApp(App)
const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  },
  theme,
  locale,
  components,
  directives
})

app.use(i18n)
app.use(vuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')
