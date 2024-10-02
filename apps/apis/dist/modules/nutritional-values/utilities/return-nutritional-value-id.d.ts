import { IPrismaTransaction } from 'src/core/interfaces';
import { Ingredient } from '@prisma/client';
export declare function returnNutritionalValueId(prisma: IPrismaTransaction, ingredients: Ingredient[], nutritionalValueId?: string): Promise<string>;
