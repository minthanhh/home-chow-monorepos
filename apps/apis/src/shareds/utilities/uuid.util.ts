import { uuidRegex } from '../constants'

type IngredientType = { image: string; name: string }
type UuidNamePairsType = Array<string | IngredientType>

/**
 *
 * @param {string[]} l is short name of uuidNamePairs understood are list
 * @var {string[]} u is short name of uuids
 * @var {string[]} n is short name of names
 * @returns {[string[], string[]]}
 */
export function extractUuidAndNameArrays(l: UuidNamePairsType): [string[], IngredientType[]] {
    const u: string[] = [],
        n: IngredientType[] = []

    const le = l.length

    for (let i = 0; i < le; i++) {
        const p = l[i]

        if (typeof p === 'string' && uuidRegex.test(p)) {
            u.push(p)
            continue
        }
        n.push(p as IngredientType)
    }
    return [u, n]
}
