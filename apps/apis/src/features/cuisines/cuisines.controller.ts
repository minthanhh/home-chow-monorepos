import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { CuisinesService } from './cuisines.service'
import { CreateCuisineDto } from './dto/create-cuisine.dto'
import { UpdateCuisineDto } from './dto/update-cuisine.dto'

@Controller('cuisines')
export class CuisinesController {
    constructor(private readonly cuisinesService: CuisinesService) {}

    @Post()
    create(@Body() createCuisineDto: CreateCuisineDto) {
        return this.cuisinesService.create(createCuisineDto)
    }

    @Get()
    findAll() {
        return this.cuisinesService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.cuisinesService.findOneById(id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCuisineDto: UpdateCuisineDto) {
        return this.cuisinesService.update(id, updateCuisineDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.cuisinesService.remove(id)
    }
}
