import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Res, UploadedFile, UseInterceptors } from '@nestjs/common'
import { TodosService } from './todos.service'
import { CreateTodoDto, UpdateTodoDto } from './dtos'
import { FileInterceptor } from '@nestjs/platform-express'
import { PrismaService } from 'src/shareds'
import { Response } from 'express'

@Controller('todos')
export class TodosController {
    constructor(
        private readonly todosService: TodosService,
        private readonly prismaService: PrismaService,
    ) {}

    @Get('get-todos')
    async getTodos() {
        console.log('getTodos')
        return await this.todosService.getTodos()
    }

    @Get('get-todo/:id')
    async getTodo(@Param('id') id: string) {
        console.log('getTodo')
        return await this.todosService.getTodo(id)
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('create-todo')
    async createTodo(@Body() createTodoDto: CreateTodoDto) {
        console.log('createTodo')
        return await this.todosService.createTodo(createTodoDto)
    }

    @HttpCode(HttpStatus.OK)
    @Put('update-todo/:id')
    async updateTodo(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
        console.log('updateTodo')
        return await this.todosService.updateTodo(id, updateTodoDto)
    }

    @HttpCode(HttpStatus.OK)
    @Delete('delete-todo/:id')
    async deleteTodo(@Param('id') id: string) {
        console.log('deleteTodo')
        return await this.todosService.deleteTodo(id)
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        try {
            const res = await this.prismaService.image.create({ data: { buffer: '', mineType: file.mimetype } })
            console.log('sucessfully uploaded', res.id)
        } catch (error) {
            console.log(error)
        }
    }

    @Get('upload/image/:id')
    async getImage(@Param('id') id: string, @Res() res: Response) {
        const image = await this.prismaService.image.findUnique({ where: { id } })
        res.setHeader('Content-Type', image.mineType)
        res.send(image.buffer)
    }
}
