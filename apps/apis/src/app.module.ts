import { Module } from '@nestjs/common'
import { TodosModule } from './modules/todos/todos.module'
import { UsersModule } from './modules/users/users.module'
import { PrismaModule } from './shareds/globals'
import { TwilioModule } from './modules/twilio/twilio.module'
import { MailModule } from './modules/mail/mail.module'
import { IngredientsModule } from './modules/ingredients/ingredients.module'
import { MealsModule } from './modules/meals/meals.module'
import { RecipesModule } from './modules/recipes/recipes.module'
import { CuisinesModule } from './modules/cuisines/cuisines.module'
import { CacheModule } from '@nestjs/cache-manager'
import { NutritionalValuesModule } from './modules/nutritional-values/nutritional-values.module'
import { BlogsModule } from './modules/blogs/blogs.module'
import { OrdersModule } from './modules/orders/orders.module'

@Module({
    imports: [
        CacheModule.register({ isGlobal: true }),
        PrismaModule,
        TodosModule,
        UsersModule,
        TwilioModule,
        MailModule,
        MealsModule,
        IngredientsModule,
        RecipesModule,
        CuisinesModule,
        NutritionalValuesModule,
        BlogsModule,
        OrdersModule,
    ],
})
export class AppModule {}
