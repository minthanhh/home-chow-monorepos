import { PartialType } from '@nestjs/swagger'
import { CreateNutritionalValueDto } from './create-nutritional-value.dto'

export class UpdateNutritionalValueDto extends PartialType(CreateNutritionalValueDto) {}
