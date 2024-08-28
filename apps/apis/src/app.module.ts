import { Module } from '@nestjs/common'
import { TodosModule } from './features/todos/todos.module'
import { UsersModule } from './features/users/users.module'
import { PrismaModule } from './shareds/globals'
import { TwilioModule } from './features/twilio/twilio.module'
import { MailModule } from './features/mail/mail.module'

@Module({
    imports: [PrismaModule, TodosModule, UsersModule, TwilioModule, MailModule],
})
export class AppModule {}
