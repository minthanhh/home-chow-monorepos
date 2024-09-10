<template>
  <v-navigation-drawer
    :expand-on-hover="props.expandOnHover"
    :rail="props.expandOnHover"
    :persistent="props.expandOnHover"
    :scrim="false"
    :absolute="false"
    :disable-route-watcher="true"
    v-model="drawer"
    sticky
    mobile
    class="fixed"
  >
    <v-list>
      <v-list-item
        prepend-avatar="https://lh3.googleusercontent.com/ogw/AF2bZyikXkJGbMM365Z4nNgOWLU7zxm2yzRQbmkDKiyIEJHxVQ=s32-c-mo"
        subtitle="mint03sanzz@gmailcom"
        title="Minh Thanh"
      />
    </v-list>

    <v-divider></v-divider>

    <v-list v-for="navLink of navLinks" :key="navLink.value" density="compact" nav>
      <v-list-item
        link
        :to="navLink.value"
        :prepend-icon="navLink.icon"
        :title="navLink.title"
        :value="navLink.value"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  mdiViewGridOutline,
  mdiFoodSteak,
  mdiPostOutline,
  mdiBookEducationOutline,
  mdiMessageOutline
} from '@mdi/js'

// Định nghĩa prop nhận giá trị từ SidebarLayout
interface Props {
  drawer: boolean
  expandOnHover: boolean
}
const props = defineProps<Props>()
const emit = defineEmits(['update:drawer'])

// Sử dụng computed để điều khiển v-model của v-navigation-drawer
const drawer = computed({
  get: () => props.drawer,
  set: (value: boolean) => emit('update:drawer', value)
})

const navLinks = [
  {
    title: 'Dashboard',
    value: 'dashboard',
    icon: mdiViewGridOutline
  },
  {
    title: 'Foods Management',
    value: 'foods-management',
    icon: mdiFoodSteak
  },
  {
    title: 'Blogs',
    value: 'blogs-management',
    icon: mdiPostOutline
  },
  {
    title: 'Education',
    value: 'education-management',
    icon: mdiBookEducationOutline
  },
  // {
  //   title: 'CronJobs',
  //   value: 'cron-jobs',
  //   icon: mdiWrenchClock
  // },
  {
    title: 'Chats',
    value: 'chats-management',
    icon: mdiMessageOutline
  }
]
</script>
