import { Module } from '@nestjs/common'
import { TodosModule } from './features/todos/todos.module'
import { UsersModule } from './features/users/users.module'
import { PrismaModule } from './shareds/globals'
import { TwilioModule } from './features/twilio/twilio.module'
import { MailModule } from './features/mail/mail.module'
import { IngredientsModule } from './features/ingredients/ingredients.module'
import { MealsModule } from './features/meals/meals.module'
import { RecipesModule } from './features/recipes/recipes.module'
import { CuisinesModule } from './features/cuisines/cuisines.module'

@Module({
    imports: [PrismaModule, TodosModule, UsersModule, TwilioModule, MailModule, MealsModule, IngredientsModule, RecipesModule, CuisinesModule],
})
export class AppModule {}
