<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { breakpointsVuetifyV3, useBreakpoints } from '@vueuse/core'

const drawer = ref(true)
const expandOnHover = ref(true)
const DRAWER_WIDTH = 56

const breakpoints = useBreakpoints(breakpointsVuetifyV3)
const largerThanSm = breakpoints.greater('sm')
const vLayoutLeft = ref('')

watchEffect(() => {
  if (largerThanSm.value) {
    drawer.value = true
    expandOnHover.value = true
    vLayoutLeft.value = '--v-layout-left: 56px'
  } else {
    drawer.value = false
    expandOnHover.value = false
    vLayoutLeft.value = '--v-layout-left: 0px'
  }
})
</script>

<template>
  <v-card>
    <v-layout fullHeight>
      <!-- Truyền 'drawer' qua prop và lắng nghe sự kiện 'update:drawer' -->
      <router-view
        name="CommonSidebar"
        :drawer="drawer"
        :expandOnHover="expandOnHover"
        @update:drawer="drawer = $event"
      />
      <v-main :style="vLayoutLeft">
        <v-app-bar
          color="primary"
          prominent
          :class="largerThanSm ? 'left-14 w-[calc(100%-var(--v-layout-left)]' : 'left-0'"
        >
          <v-app-bar-nav-icon
            variant="text"
            class="md:hidden block"
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>
          <v-toolbar-title>My files</v-toolbar-title>
          <v-spacer></v-spacer>
          <!-- 
          <template v-if="$vuetify.display.mdAndUp">
            <v-btn icon="mdi-magnify" variant="text"></v-btn>
            <v-btn icon="mdi-filter" variant="text"></v-btn>
          </template>
          <v-btn icon="mdi-dots-vertical" variant="text"></v-btn> -->
        </v-app-bar>

        <router-view />
      </v-main>
    </v-layout>
  </v-card>
</template>
