<template>
  <div class="flex items-start m-4 gap-4 h-full">
    <!-- Main content area -->
    <div class="shadow-2xl rounded-md p-4 w-3/4 bg-white">
      <v-form class="w-full flex flex-col gap-2" @submit.prevent="submit">
        <div class="flex flex-col gap-2">
          <label for="name" class="text-sm font-semibold text-gray-800 select-none">
            Meal name:
          </label>
          <v-text-field
            id="name"
            placeholder="Please enter your meal name"
            variant="outlined"
            density="compact"
            v-model="name.value.value"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label for="description" class="text-sm font-semibold text-gray-800 select-none">
            Describe for meal:
          </label>
          <v-textarea
            id="description"
            variant="outlined"
            density="compact"
            placeholder="Please enter description for meal"
            v-model="description.value.value"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label for="image" class="text-sm font-semibold text-gray-800 select-none">
            Upload image for meal:
          </label>
          <v-file-input
            id="image"
            class="w-full"
            variant="outlined"
            density="compact"
            :prepend-icon="null"
            required
            v-model="image.value.value"
          />
        </div>

        <VAutocomplete
          v-model="selectedRecipe"
          :items="recipes"
          label="Choose recipe"
          :loading="isRecipesLoading"
          :disabled="isRecipesLoading"
          item-value="id"
          item-text="description"
          variant="outlined"
          density="compact"
          placeholder="Please select recipe for meal"
          :append-icon="mdiPlusBoxOutline"
          v-on:click:append="isNewRecipe = !isNewRecipe"
          @update:model-value="onChangeRecipe"
          clearable
        >
          <template v-slot:chip="{ props, item }">
            <p v-bind="props">
              {{ item.raw.description }}
            </p>
          </template>
          <template v-slot:item="{ props, item }">
            <VListItem v-bind="props" :title="item.raw.description" />
          </template>
        </VAutocomplete>

        <v-text-field
          v-if="isNewRecipe"
          label="Recipe description"
          variant="outlined"
          density="compact"
        />

        <div class="flex flex-col gap-2">
          <label for="ingredients" class="text-sm font-semibold text-gray-800 select-none">
            Choose ingredients for the recipe:
          </label>
          <VAutocomplete
            id="ingredients"
            v-model="selectedIngredient"
            :items="ingredients"
            :loading="isIngredientsLoading"
            :disabled="isIngredientsLoading"
            return-object
            variant="outlined"
            density="compact"
            chips
            closable-chips
            multiple
            placeholder="Please choose ingredients for the recipe"
            class="md:grid flex flex-col"
          >
            <template v-slot:chip="{ props, item }">
              <VChip v-bind="props" :prepend-avatar="item.raw.image" :text="item.raw.name" />
            </template>

            <template v-slot:item="{ props, item }">
              <VListItem
                v-bind="props"
                v-bind:title="item.raw.name"
                :prepend-avatar="item.raw.image"
              >
                <template v-slot:title="{ title }">
                  <div class="flex items-center gap-2">
                    {{ title }}
                    <DisplayNutritionalValues
                      :carbohydrates="item.raw.carbohydrates"
                      :fat="item.raw.fat"
                      :protein="item.raw.protein"
                    />
                  </div>
                </template>
              </VListItem>
            </template>

            <template v-slot:append>
              <div class="flex flex-col gap-2 w-full mt-0 md:mt-4 -ml-4 md:-ml-0">
                <v-btn block @click="addIngredientsToRecipe" :disabled="!selectedIngredient.length"
                  >Add</v-btn
                >
                <v-btn block @click="isNewIngredient = !isNewIngredient">Create new</v-btn>
              </div>
            </template>
          </VAutocomplete>
        </div>

        <FormAddIngredient v-if="isNewIngredient" />

        <article v-if="ingredientByRecipe.length > 0">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-sm font-semibold text-gray-800">Listed ingredients seleted</h3>
            <v-btn
              :prepend-icon="mdiDeleteEmpty"
              @click="ingredientStore.deleteOneOrManyIngredientsInRecipe('many')"
              density="compact"
              class="text-red-500 hover:text-red-300 duration-200 transition-all ease-linear"
              >All</v-btn
            >
          </div>
          <v-list class="flex items-center gap-4 flex-nowrap overflow-x-auto">
            <v-list-item
              v-for="(ingredient, index) in ingredientByRecipe"
              :key="ingredient.id"
              class="p-1 hover:shadow-md transition-shadow ease-linear duration-150 shadow-none bg-white rounded-md flex items-center relative border"
            >
              <template v-slot:prepend>
                <div
                  class="size-12 shadow-md m-1 rounded-sm flex items-center justify-center mr-2 overflow-hidden"
                >
                  <v-img :src="ingredient.image" cover></v-img>
                </div>
              </template>
              <v-list-item-title>{{ ingredient.name }}</v-list-item-title>
              <v-list-item-subtitle>
                <DisplayNutritionalValues
                  :carbohydrates="ingredient.carbohydrates"
                  :fat="ingredient.fat"
                  :protein="ingredient.protein"
                />
              </v-list-item-subtitle>
              <v-btn
                :icon="mdiClose"
                class="ml-4 text-red-300 transition-colors duration-150 ease-linear hover:text-red-500 absolute -right-2.5 -top-2.5 size-6 text-sm"
                density="compact"
                @click="ingredientStore.deleteOneOrManyIngredientsInRecipe('one', index)"
              />
            </v-list-item>
          </v-list>
        </article>

        <v-btn
          :disabled="isMealsLoading"
          :loading="isMealsLoading"
          class="mt-6 text-uppercase font-weight-bold"
          type="submit"
        >
          {{ t('$vuetify.common_btn_login_title') }}
        </v-btn>
      </v-form>

      <v-img
        width="500"
        height="500"
        src="http://localhost:3000/apis/todos/upload/image/f9545342-7e59-4ada-aa7a-b4ea1cb765c2"
      ></v-img>

      <v-card
        v-for="meal of meals"
        :key="meal.id"
        class="mx-auto my-8"
        elevation="16"
        max-width="344"
      >
        <v-card-item>
          <v-card-title>{{ meal.name }} </v-card-title>
          <v-card-subtitle> Card subtitle secondary text </v-card-subtitle>
        </v-card-item>
        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </v-card-text>
      </v-card>
    </div>

    <!-- Sticky sidebar -->
    <div class="top-4 h-full w-1/4">
      <div
        class="w-full sticky top-0 right-0 left-0 bg-white shadow-2xl rounded-md p-4 h-[calc(100%-80px)]"
      >
        <div class="relative w-full h-full max-h-[600px] overflow-hidden">
          <div
            class="absolute bg-no-repeat bg-contain h-[600px] bg-center overflow-hidden z-50 inset-0"
            :style="{ backgroundImage: `url(${iphoneMockup})`, zIndex: 9999 }"
          >
            <div class="absolute inset-0 py-4 px-7 z-40 overflow-hidden w-full h-full">
              <div class="overflow-y-auto h-full no-scrollbar rounded-[2rem]">
                <div class="w-full overflow-hidden h-[260px]">
                  <v-img
                    src="https://s3-alpha-sig.figma.com/img/c3ba/3fc7/8edcf0804627d641e7ed5eb02b7e2dfa?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IgzQroquqO6Mmxwwibxk-O6LIOpCgNxnQLewCpU6RMeT4-~y-VRVKVRoMzD8wZytZ-CGnKKhkDNUa7N4Eb4x9phIXdRZP8q~mcpsBlRMAPJcvuG9jtEEarlzlL~EeKGwApIk85dBnHIEMb4tvc9E-1KKL4Kp8fWp2EwxmrllxzcrWGV5XTKqTv914MddjNAVKq9LSAyxc17VWSMgTraLJjOFUppDi~C4yaP9dd2e7l2pZS6a4WJK4tc92VcIPhaillNy6P483kzUigxCk8z5xZ7Ag7OSTq1GtgO-yQ0CBfPEg~xZ4mgRWsq8ab8WSrqgHQzGLKEZl1uFjSMNUrpxPg__"
                    class="w-full h-full relative"
                    cover
                  ></v-img>
                </div>
                <div class="py-4 px-3 bg-white">
                  <!-- Meal information -->
                  <h5 class="text-h5 font-bold block mb-1">Beef Brisket</h5>

                  <div class="inline-flex items-center gap-0.5">
                    <div class="size-4">
                      <v-img
                        class="w-full h-full"
                        src="https://homechow-s3-bucket.s3.amazonaws.com/images/american.svg"
                      />
                    </div>
                    <p class="font-semibold text-[#666D80] text-xs">American</p>
                  </div>

                  <div class="inline-flex items-center gap-0.5 ml-2">
                    <div class="size-4">
                      <v-img
                        class="w-full h-full"
                        src="https://homechow-s3-bucket.s3.amazonaws.com/images/american.svg"
                      />
                    </div>
                    <p class="font-semibold text-[#666D80] text-xs">525 kcal</p>
                  </div>

                  <p class="block text-xs mt-1 text-[#666D80]">
                    Beef brisket is a flavorful and tender cut of meat that comes from the breast
                    section of the cow. Known for its rich, beefy taste.
                  </p>

                  <div class="mt-3 my-1 h-[1px] bg-gray-300 w-full"></div>

                  <!-- Ingredients -->
                  <h6 class="text-base font-bold block mb-2">Ingredients</h6>
                  <p class="block text-xs text-[#666D80]">
                    Our Beef Brisket is made only with quality ingredients - fresh meat, olive oil,
                    and herbs.
                  </p>

                  <div
                    class="overflow-x-auto flex items-center flex-nowrap mt-2.5 gap-2.5 no-scrollbar"
                  >
                    <div v-for="item in 5" :key="item" class="text-center">
                      <div class="size-16 shadow-md bg-[#F6F8FA] flex items-center justify-center">
                        <v-img
                          src="https://s3-alpha-sig.figma.com/img/fb8d/9a2e/0448c84b75f7768d1a99603b3003566c?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qXEMWgN244foVdhPTgLH7IYlt3dPWtKEtl1pIjBmbPRbKSRe9AQY~T-7SLxdV6qM~jRqvOHlnjd0md4LWgW1nroYUUQ3kROv~fF8K0WPL30IgGzSk5xqgHWvt2CH5mIehfEeQ1NeWn-6rOZz3vM18wNpLfHKFGbDKNGs9rDx8b0JHsEXiLl0ZC~TDQuWNTa~9hmBm8s07rWl341p8gr~-C9LtxBctyOQXiPB-HeFezPPdPEWfjl2zvcknDIczWIsqCC6kwosO65gBBs3ryH6tMCGoMnU-24mT8891qD1VHDVQwiiK-r4KIbXbXk7gl3CEwKDqRBWbWEq~N9qxHdcqQ__"
                        ></v-img>
                      </div>
                      <p class="text-xs mt-0.5 text-[#666D80]">Beef</p>
                    </div>
                  </div>

                  <div class="mt-3 my-1 h-[1px] bg-gray-300 w-full"></div>

                  <div class="flex items-start justify-between">
                    <div class="flex flex-col">
                      <h6 class="text-base font-bold block mb-2">Nutritional value</h6>
                      <div class="flex items-center gap-1">
                        <div class="size-3 rounded-[3px] bg-red-500"></div>
                        <p class="text-xs"><strong>54%</strong> Carbohydrates</p>
                      </div>
                      <div class="flex items-center gap-1">
                        <div class="size-3 rounded-[3px] bg-red-500"></div>
                        <p class="text-xs"><strong>24%</strong> Protein</p>
                      </div>
                      <div class="flex items-center gap-1">
                        <div class="size-3 rounded-[3px] bg-red-500"></div>
                        <p class="text-xs"><strong>22%</strong> Fat</p>
                      </div>
                    </div>
                    <apexchart type="donut" :options="chartOptions" :series="series" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMealStore } from '@/stores'
import { useRecipeStore } from '@/stores/recipe'
import { toTypedSchema } from '@vee-validate/zod'
import { storeToRefs } from 'pinia'
import { useField, useForm } from 'vee-validate'
import { computed, onMounted, ref, watchEffect } from 'vue'
import { useLocale } from 'vuetify'
import * as zod from 'zod'
import { mdiPlusBoxOutline, mdiClose, mdiDeleteEmpty } from '@mdi/js'
import { FormAddIngredient } from '@/features/meals'
import { useIngredientStore } from '@/stores/ingredient'
import type { IIngredient } from '@/shareds/interfaces'
import { DisplayNutritionalValues } from '@/shareds/components'

import iphoneMockup from '@/assets/iphone-mockup.png'

const mealStore = useMealStore()
const recipeStore = useRecipeStore()
const ingredientStore = useIngredientStore()
const { ingredients, isIngredientsLoading, ingredientByRecipe } = storeToRefs(ingredientStore)
const { meals, isMealsLoading } = storeToRefs(mealStore)
const { recipes, isRecipesLoading } = storeToRefs(recipeStore)
const isNewRecipe = ref(false)
const isNewIngredient = ref(false)
const selectedIngredient = ref<IIngredient[]>([])
const selectedRecipe = ref<string | null>(null)

const { t } = useLocale()

onMounted(mealStore.getMeals)
onMounted(recipeStore.getRecipes)
onMounted(ingredientStore.$getIngredients)

const series = [44, 55, 13, 33]

const chartOptions = computed(() => {
  return {
    chart: {
      width: 20,
      type: 'donut',
      height: 380
    },
    dataLabels: {
      enabled: false
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            show: false
          }
        }
      }
    ],
    legend: {
      position: 'right',
      offsetY: 0,
      height: 230
    }
  }
})

watchEffect(() => {
  console.log('values', values)
})

const { handleSubmit, resetForm, values } = useForm({
  validationSchema: toTypedSchema(
    zod.object({
      name: zod
        .string({ message: t('$vuetify.common_form_validate_username_or_email_required') })
        .min(1, { message: t('$vuetify.common_form_validate_username_or_email_required') }),
      image: zod
        .string({ message: t('$vuetify.common_form_validate_password_requied') })
        .min(1, { message: t('$vuetify.common_form_validate_password_requied') }),
      description: zod
        .string({ message: t('$vuetify.common_form_validate_username_or_email_required') })
        .min(1, { message: t('$vuetify.common_form_validate_username_or_email_required') })
    })
  )
})

const name = useField<string>('name')
const description = useField<string>('description')
const image = useField<File>('image')

const submit = handleSubmit(async (values) => {
  console.log('values', values)
})

const onChangeRecipe = async (recipeId: string) => {
  await ingredientStore.$getIngredientByRecipe(recipeId)
}

const addIngredientsToRecipe = () => {
  if (!selectedIngredient.value.length) return
  ingredientStore.addIngredientsToRecipe(selectedIngredient.value)
  selectedIngredient.value = []
}
</script>
