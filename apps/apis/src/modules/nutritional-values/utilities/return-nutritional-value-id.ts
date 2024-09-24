import { caculateNutritionalValue } from './caculate-nutritional-value'
import { calculateArrayOrNumberPercentage } from './caculate-percent'
import { Ingredient } from '@prisma/client'
import { IPrismaTransaction } from 'src/core/interfaces'

export async function returnNutritionalValueId(prisma: IPrismaTransaction, ingredients: Ingredient[], nutritionalValueId?: string) {
    const { protein, fat, carbohydrates, totalMass } = caculateNutritionalValue(ingredients)
    const [proteinPercent, fatPercent, carbohydratesPercent] = calculateArrayOrNumberPercentage([protein, fat, carbohydrates], totalMass)
    const kcal = protein * 4 + fat * 9 + carbohydrates * 4

    const nutritionalValue = await prisma.nutritionalValue.upsert({
        where: {
            id: nutritionalValueId,
        },
        update: {
            protein: proteinPercent,
            carbohydrates: carbohydratesPercent,
            fat: fatPercent,
            kcal: kcal,
        },
        create: {
            protein: proteinPercent,
            carbohydrates: carbohydratesPercent,
            fat: fatPercent,
            kcal: kcal,
        },
    })

    return nutritionalValue.id
}
