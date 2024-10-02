import { Module } from '@nestjs/common'
import { NutritionalValuesService } from './nutritional-values.service'

@Module({
    controllers: [],
    providers: [NutritionalValuesService],
})
export class NutritionalValuesModule {}
