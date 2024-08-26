import { Module } from '@nestjs/common'
import { TodosModule } from './features/todos/todos.module'
import { PrismaService } from './shareds'
import { UsersModule } from './features/users/users.module'

@Module({
    imports: [TodosModule, UsersModule],
    providers: [PrismaService],
})
export class AppModule {}
