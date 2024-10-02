import { CreateIngredientDto } from '../dtos';
import { IPrismaTransaction } from 'src/core/interfaces';
import { Ingredient } from '@prisma/client';
export declare function returnIngredients(prisma: IPrismaTransaction, createIngredients: (CreateIngredientDto | string)[]): Promise<Ingredient[]>;
