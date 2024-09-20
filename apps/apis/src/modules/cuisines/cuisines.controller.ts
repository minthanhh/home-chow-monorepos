import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards, UploadedFile } from '@nestjs/common'
import { CuisinesService } from './cuisines.service'
import { CreateCuisineDto } from './dtos/create-cuisine.dto'
import { UpdateCuisineDto } from './dtos/update-cuisine.dto'
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger'
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager'
import { JwtAuthGuard } from '../users'
import { FileInterceptor } from '@nestjs/platform-express'

@ApiTags('cuisines')
@Controller('cuisines')
@UseGuards(JwtAuthGuard)
export class CuisinesController {
    constructor(private readonly cuisinesService: CuisinesService) {}

    @UseInterceptors(FileInterceptor('icon'))
    @ApiBody({ type: CreateCuisineDto, required: true })
    @Post()
    async create(@Body() createCuisineDto: CreateCuisineDto, @UploadedFile() icon: Express.Multer.File) {
        return await this.cuisinesService.create(createCuisineDto, icon)
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
