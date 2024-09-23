import { Module } from '@nestjs/common'
import { CacheModule } from '@nestjs/cache-manager'
import { PrismaModule } from './shareds'
import { AwsS3Module } from './providers'

import {
    TodosModule,
    BlogsModule,
    NutritionalValuesModule,
    OrdersModule,
    IngredientsModule,
    RecipesModule,
    CuisinesModule,
    MailModule,
    UsersModule,
    MealsModule,
    TwilioModule,
    DevicesModule,
} from './modules'

@Module({
    imports: [
        CacheModule.register({ isGlobal: true }),
        AwsS3Module,
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
        DevicesModule,
    ],
})
export class AppModule {}
