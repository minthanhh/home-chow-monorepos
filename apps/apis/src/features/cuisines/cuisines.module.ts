import { Module } from '@nestjs/common'
import { CuisinesService } from './cuisines.service'
import { CuisinesController } from './cuisines.controller'

@Module({
    controllers: [CuisinesController],
    providers: [CuisinesService],
})
export class CuisinesModule {}
