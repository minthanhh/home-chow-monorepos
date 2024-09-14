import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateOrCreateRecipeDto {
    @IsString()
    @IsNotEmpty()
    description: string
}
