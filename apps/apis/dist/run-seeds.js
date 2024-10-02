"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_json_1 = require("./core/seeds/jsons/user.json");
const meal_json_1 = require("./core/seeds/jsons/meal.json");
const userMeal_json_1 = require("./core/seeds/jsons/userMeal.json");
const ingredient_json_1 = require("./core/seeds/jsons/ingredient.json");
const recipe_json_1 = require("./core/seeds/jsons/recipe.json");
const recipe_ingredient_json_1 = require("./core/seeds/jsons/recipe-ingredient.json");
const nutritional_value_json_1 = require("./core/seeds/jsons/nutritional-value.json");
const cuisine_json_1 = require("./core/seeds/jsons/cuisine.json");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    try {
        const dataToSeed = {
            users: user_json_1.default || [],
            cuisines: cuisine_json_1.default || [],
            nutritionalValues: nutritional_value_json_1.default || [],
            ingredients: ingredient_json_1.default || [],
            recipes: recipe_json_1.default || [],
            meals: meal_json_1.default || [],
            userMeals: userMeal_json_1.default || [],
            recipeIngredients: recipe_ingredient_json_1.default || [],
        };
        await prisma.$transaction([
            prisma.user.createMany({ data: dataToSeed.users }),
            prisma.cuisine.createMany({ data: dataToSeed.cuisines }),
            prisma.nutritionalValue.createMany({ data: dataToSeed.nutritionalValues }),
            prisma.ingredient.createMany({ data: dataToSeed.ingredients }),
            prisma.recipe.createMany({ data: dataToSeed.recipes }),
            prisma.meal.createMany({ data: dataToSeed.meals }),
            prisma.userMeal.createMany({ data: dataToSeed.userMeals }),
            prisma.recipeIngredient.createMany({ data: dataToSeed.recipeIngredients }),
        ]);
        console.log('Seeding completed successfully!');
    }
    catch (e) {
        console.error('Error during seeding, rolling back changes...');
        console.error(e);
        throw e;
    }
    finally {
        await prisma.$disconnect();
    }
}
main().catch((e) => {
    console.error(e);
    process.exit(1);
});
//# sourceMappingURL=run-seeds.js.map