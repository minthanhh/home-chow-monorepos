import { Module } from '@nestjs/common'
import { CuisinesService } from './cuisines.service'
import { CuisinesController } from './cuisines.controller'
import { UniqueValidator } from 'src/shareds'

@Module({
    controllers: [CuisinesController],
    providers: [CuisinesService, UniqueValidator],
})
export class CuisinesModule {}
