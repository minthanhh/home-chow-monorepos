import { Module } from '@nestjs/common'
import { MealsService } from './meals.service'
import { MealsController } from './meals.controller'
import { IngredientsService } from '../ingredients'
import { RecipesService } from '../recipes'
import { ExistsValidator } from 'src/shareds'

@Module({
    imports: [],
    controllers: [MealsController],
    providers: [MealsService, IngredientsService, RecipesService, ExistsValidator],
})
export class MealsModule {}
