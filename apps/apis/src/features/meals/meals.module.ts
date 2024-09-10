import { Module } from '@nestjs/common'
import { MealsService } from './meals.service'
import { MealsController } from './meals.controller'
import { IngredientsService } from '../ingredients'
import { RecipesService } from '../recipes'

@Module({
    imports: [],
    controllers: [MealsController],
    providers: [MealsService, IngredientsService, RecipesService],
})
export class MealsModule {}
