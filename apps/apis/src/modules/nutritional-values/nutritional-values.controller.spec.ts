import { Test, TestingModule } from '@nestjs/testing'
import { NutritionalValuesController } from './nutritional-values.controller'
import { NutritionalValuesService } from './nutritional-values.service'

describe('NutritionalValuesController', () => {
    let controller: NutritionalValuesController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [NutritionalValuesController],
            providers: [NutritionalValuesService],
        }).compile()

        controller = module.get<NutritionalValuesController>(NutritionalValuesController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })
})
