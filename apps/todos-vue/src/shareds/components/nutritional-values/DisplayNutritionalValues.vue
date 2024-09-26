<template>
  <p class="inline-flex items-center gap-0.5 ml-auto">
    <VIcon :icon="mdiFoodDrumstickOutline" />
    <small>{{ protein }}</small>
  </p>
  <p class="inline-flex items-center gap-0.5">
    <VIcon :icon="mdiHuman" />
    <small>{{ fat }}</small>
  </p>
  <p class="inline-flex items-center gap-0.5">
    <VIcon :icon="mdiWaterOutline" />
    <small>{{ carbohydrates }}</small>
  </p>
</template>

<script lang="ts" setup>
import type { IIngredient } from '@/shareds/interfaces'
import { mdiFoodDrumstickOutline, mdiHuman, mdiWaterOutline } from '@mdi/js'

interface Props extends Pick<IIngredient, 'carbohydrates' | 'protein' | 'fat'> {}
defineProps<Props>()
</script>
