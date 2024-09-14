import { Ingredient } from '@prisma/client'

export function caculateNutritionalValue(ingredients: Ingredient[]) {
    return ingredients.reduce(
        (acc, { protein, fat, carbohydrates }) => {
            acc.protein += protein
            acc.fat += fat
            acc.carbohydrates += carbohydrates
            acc.totalMass += protein + fat + carbohydrates // Cộng trực tiếp mỗi lần lặp
            return acc
        },
        { protein: 0, carbohydrates: 0, fat: 0, totalMass: 0 },
    )
}
