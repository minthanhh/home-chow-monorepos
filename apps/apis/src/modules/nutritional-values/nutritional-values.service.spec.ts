import { Test, TestingModule } from '@nestjs/testing'
import { NutritionalValuesService } from './nutritional-values.service'

describe('NutritionalValuesService', () => {
    let service: NutritionalValuesService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [NutritionalValuesService],
        }).compile()

        service = module.get<NutritionalValuesService>(NutritionalValuesService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
