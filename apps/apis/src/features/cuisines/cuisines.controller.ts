import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { CuisinesService } from './cuisines.service'
import { CreateCuisineDto } from './dto/create-cuisine.dto'
import { UpdateCuisineDto } from './dto/update-cuisine.dto'
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger'

@ApiTags('cuisines')
@Controller('cuisines')
export class CuisinesController {
    constructor(private readonly cuisinesService: CuisinesService) {}

    @Post()
    @ApiBody({ type: CreateCuisineDto, required: true })
    async create(@Body() createCuisineDto: CreateCuisineDto) {
        return await this.cuisinesService.create(createCuisineDto)
    }

    @Get()
    async findAll() {
        return await this.cuisinesService.findAll()
    }

    @Get(':id')
    @ApiParam({ name: 'id', required: true, type: String })
    async findOne(@Param('id') id: string) {
        return await this.cuisinesService.findOneById(id)
    }

    @Patch(':id')
    @ApiParam({ name: 'id', required: true, type: String })
    @ApiBody({ type: UpdateCuisineDto, required: true })
    async update(@Param('id') id: string, @Body() updateCuisineDto: UpdateCuisineDto) {
        return await this.cuisinesService.update(id, updateCuisineDto)
    }

    @Delete(':id')
    @ApiParam({ name: 'id', required: true, type: String })
    async remove(@Param('id') id: string) {
        return await this.cuisinesService.remove(id)
    }
}
