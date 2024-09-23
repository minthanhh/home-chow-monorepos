import { PrismaClient } from '@prisma/client'
import * as userData from './core/seeds/jsons/user.json'
import * as mealData from './core/seeds/jsons/meal.json'
import * as userMealData from './core/seeds/jsons/userMeal.json'
import * as ingredientData from './core/seeds/jsons/ingredient.json'
import * as recipeData from './core/seeds/jsons/recipe.json'
import * as recipeIngredientData from './core/seeds/jsons/recipe-ingredient.json'
import * as nutritionalValueData from './core/seeds/jsons/nutritional-value.json'
import * as cuisineData from './core/seeds/jsons/cuisine.json'
import * as imageData from './core/seeds/jsons/image.json'

const prisma = new PrismaClient()

async function main() {
    try {
        // Kiểm tra dữ liệu trước khi thực hiện seed
        const dataToSeed = {
            images: imageData || [],
            users: userData || [],
            cuisines: cuisineData || [],
            nutritionalValues: nutritionalValueData || [],
            ingredients: ingredientData || [],
            recipes: recipeData || [],
            meals: mealData || [],
            userMeals: userMealData || [],
            recipeIngredients: recipeIngredientData || [],
        }

        // Thực hiện transaction cho toàn bộ quá trình seed
        await prisma.$transaction([
            prisma.image.createMany({ data: dataToSeed.images }),
            prisma.user.createMany({ data: dataToSeed.users }),
            prisma.cuisine.createMany({ data: dataToSeed.cuisines }),
            prisma.nutritionalValue.createMany({ data: dataToSeed.nutritionalValues }),
            prisma.ingredient.createMany({ data: dataToSeed.ingredients }),
            prisma.recipe.createMany({ data: dataToSeed.recipes }),
            prisma.meal.createMany({ data: dataToSeed.meals }),
            prisma.userMeal.createMany({ data: dataToSeed.userMeals }),
            prisma.recipeIngredient.createMany({ data: dataToSeed.recipeIngredients }),
        ])

        console.log('Seeding completed successfully!')
    } catch (e) {
        console.error('Error during seeding, rolling back changes...')
        console.error(e)
        throw e // Để xử lý lỗi trong phần catch bên dưới
    } finally {
        await prisma.$disconnect()
    }
}

main().catch((e) => {
    console.error(e)
    process.exit(1) // Thoát với mã lỗi nếu có vấn đề xảy ra
})
