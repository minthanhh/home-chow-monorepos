import { uuidRegex } from '../constants'
import { Image, Ingredient } from '@prisma/client'

type IngredientType = Omit<Ingredient, 'id' | 'createdAt' | 'updatedAt' | 'protein' | 'fat' | 'quantity' | 'carbohydrates'> & {
    protein: string
    fat: string
    carbohydrates: string
    quantity: string
}

type ReturnIngredientType = Omit<Ingredient, 'id' | 'createdAt' | 'updatedAt'>

type UuidNamePairsType = Array<string | Partial<IngredientType>>

/**
 *
 * @param {string[]} l is short name of uuidNamePairs understood are list
 * @var {string[]} u is short name of uuids
 * @var {string[]} n is short name of names
 * @returns {[string[], string[]]}
 */
export function extractUuidAndNameArrays(l: UuidNamePairsType, imgs: Image[]): [string[], ReturnIngredientType[]] {
    const u: string[] = [],
        n: ReturnIngredientType[] = []

    const le = l.length

    for (let i = 0; i < le; i++) {
        const p = l[i]

        if (typeof p === 'string' && uuidRegex.test(p)) {
            u.push(p)
            continue
        }

        const po = p as IngredientType

        n.push({
            ...po,
            imageId: imgs[i].id,
            protein: parseInt(po.protein),
            carbohydrates: parseInt(po.carbohydrates),
            fat: parseInt(po.fat),
            quantity: parseInt(po.quantity),
        })
    }

    return [u, n]
}
