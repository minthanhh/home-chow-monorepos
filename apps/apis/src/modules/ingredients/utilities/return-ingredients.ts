import { extractUuidAndNameArrays } from 'src/shareds/utilities'
import { CreateIngredientDto } from '../dtos'
import { Ingredient } from '@prisma/client'
import { IPrismaTransaction } from 'src/core/interfaces'

export async function returnIngredients(prisma: IPrismaTransaction, createIngredients: (CreateIngredientDto | string)[]): Promise<Ingredient[]> {
    const ingredientProcess = []
    const [ingredientUuids, ingredientNames] = extractUuidAndNameArrays(createIngredients)

    if (ingredientUuids.length > 0) {
        ingredientProcess.push(prisma.ingredient.findMany({ where: { id: { in: ingredientUuids } } }))
    }

    if (ingredientNames.length > 0) {
        ingredientProcess.push(prisma.ingredient.createManyAndReturn({ data: ingredientNames }))
    }

    return (await Promise.all(ingredientProcess)).flat()
}
