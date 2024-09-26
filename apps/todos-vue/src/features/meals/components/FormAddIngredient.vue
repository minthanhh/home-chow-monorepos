<template>
  <h3 class="text-sm font-semibold text-gray-800">Form add new ingredient</h3>
  <v-form @submit="submit">
    <div class="flex items-start w-full gap-4 h-full">
      <div class="flex items-start w-2/4 flex-col">
        <v-file-input
          class="w-full"
          label="Image"
          variant="outlined"
          v-model="image.value.value"
          :disabled="isIngredientsLoading"
          density="compact"
          :prepend-icon="null"
          required
        />
        <v-text-field
          v-model="name.value.value"
          :error-messages="name.errorMessage.value"
          label="Ingredient name"
          :disabled="isIngredientsLoading"
          variant="outlined"
          class="w-full"
          density="compact"
          required
        />
        <v-btn
          class="mt-auto mr-auto capitalize font-semibold"
          :disabled="isIngredientsLoading || isNotValues"
          :loading="isIngredientsLoading"
          type="submit"
          >Add new ingredient</v-btn
        >
      </div>

      <div class="flex flex-col w-2/4">
        <v-text-field
          v-model="protein.value.value"
          :error-messages="protein.errorMessage.value"
          :prepend-inner-icon="mdiFoodDrumstickOutline"
          label="Protein"
          placeholder="Nhập khối tượng Protein"
          density="compact"
          required
          :disabled="isIngredientsLoading"
          variant="outlined"
        />
        <v-text-field
          v-model="fat.value.value"
          :error-messages="fat.errorMessage.value"
          :prepend-inner-icon="mdiHuman"
          label="Fat"
          placeholder="Nhập khối tượng Fat"
          density="compact"
          :disabled="isIngredientsLoading"
          required
          variant="outlined"
        />
        <v-text-field
          v-model="carbohydrates.value.value"
          :error-messages="carbohydrates.errorMessage.value"
          :prepend-inner-icon="mdiWaterOutline"
          label="Carbonyrates"
          placeholder="Nhập khối tượng Carbonyrates"
          density="compact"
          :disabled="isIngredientsLoading"
          required
          variant="outlined"
        />
        <v-text-field
          v-model="quantity.value.value"
          variant="outlined"
          :error-messages="quantity.errorMessage.value"
          :prepend-inner-icon="mdiWaterOutline"
          label="Quantity"
          :disabled="isIngredientsLoading"
          density="compact"
          placeholder="Nhập số lương"
          required
        />
      </div>
    </div>
  </v-form>
</template>

<script setup lang="ts">
import { uploadService } from '@/shareds/services'
import { useIngredientStore } from '@/stores/ingredient'
import { mdiFoodDrumstickOutline, mdiHuman, mdiWaterOutline } from '@mdi/js'
import { toTypedSchema } from '@vee-validate/zod'
import { storeToRefs } from 'pinia'
import { useField, useForm } from 'vee-validate'
import { computed, ref, watchEffect } from 'vue'
import * as zod from 'zod'

const ingredientStore = useIngredientStore()
const { isIngredientsLoading } = storeToRefs(ingredientStore)

const { handleSubmit, values } = useForm({
  validationSchema: toTypedSchema(
    zod.object({
      name: zod.string().min(3).max(50),
      fat: zod.string().min(1).max(50),
      protein: zod.string().min(1).max(50),
      carbohydrates: zod.string().min(1).max(50),
      quantity: zod.string().min(1).max(10),
      image: zod.any()
    })
  )
})

const name = useField<string>('name', { value: '' })
const protein = useField<string>('protein', { value: '0' })
const carbohydrates = useField<string>('carbohydrates', { value: '0' })
const fat = useField<string>('fat', { value: '0' })
const quantity = useField<string>('quantity', { value: '1' })
const image = useField<File>('image')

const isNotValues = computed(() => Object.values(values).every((v) => !v))

const isSubmitting = ref(false)

watchEffect(() => {})

const submit = handleSubmit(async ({ carbohydrates, fat, name, protein, quantity, image }) => {
  isSubmitting.value = true
  const response = await uploadService.image(image)
  await ingredientStore.$createIngredient({
    carbohydrates: carbohydrates,
    fat: fat,
    protein: protein,
    quantity: quantity,
    image: response.data,
    name: name
  })
  isSubmitting.value = false
})
</script>
