import { Module } from '@nestjs/common'
import { TodosModule } from './features/todos/todos.module'
import { PrismaService } from './shareds'

@Module({
    imports: [TodosModule],
    providers: [PrismaService],
})
export class AppModule {}
