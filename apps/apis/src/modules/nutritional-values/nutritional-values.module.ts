import { Module } from '@nestjs/common'
import { NutritionalValuesService } from './nutritional-values.service'
import { NutritionalValuesController } from './nutritional-values.controller'

@Module({
    controllers: [NutritionalValuesController],
    providers: [NutritionalValuesService],
})
export class NutritionalValuesModule {}
