export interface IIngredient {
  id?: string
  name: string
  image: string
  carbohydrates: number
  fat: number
  protein: number
  quantity: number
  updatedAt?: string
  createdAt?: string
}

export interface ICreateIngredient
  extends Omit<
    IIngredient,
    'updatedAt' | 'createdAt' | 'id' | 'fat' | 'protein' | 'quantity' | 'carbohydrates'
  > {
  carbohydrates: string
  fat: string
  protein: string
  quantity: string
}

export interface ICreateIngredientList extends Array<ICreateIngredient | string> {}

export interface IUpdateIngredient extends ICreateIngredient {}

export class IngredientModel {
  static toApi(createIngredient: ICreateIngredient): ICreateIngredient {
    return createIngredient
  }

  static toStore(createIngredient: ICreateIngredient): IIngredient {
    return {
      image: createIngredient.image,
      carbohydrates: Number(createIngredient.carbohydrates),
      fat: Number(createIngredient.fat),
      name: createIngredient.name,
      protein: Number(createIngredient.protein),
      quantity: Number(createIngredient.quantity),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  }
}
