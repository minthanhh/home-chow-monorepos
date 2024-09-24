import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards } from '@nestjs/common'
import { CuisinesService } from './cuisines.service'
import { CreateCuisineDto } from './dtos/create-cuisine.dto'
import { UpdateCuisineDto } from './dtos/update-cuisine.dto'
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger'
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager'
import { JwtAuthGuard } from '../users'

@ApiTags('cuisines')
@Controller('cuisines')
@UseGuards(JwtAuthGuard)
export class CuisinesController {
    constructor(private readonly cuisinesService: CuisinesService) {}

    @ApiBody({ type: CreateCuisineDto, required: true })
    @Post()
    async create(@Body() createCuisineDto: CreateCuisineDto) {
        return await this.cuisinesService.create(createCuisineDto)
    }

    @UseInterceptors(CacheInterceptor)
    @CacheTTL(600)
    @CacheKey('CACHE_CUISINES')
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
