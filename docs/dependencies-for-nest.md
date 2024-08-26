# Dependencies for nest apis

-   For security and config default for application:

```shell
pnpm add helmet csurf crypto bcrypt cookie-parser class-validator class-transformer @nestjs/throttler @nestjs/config joi compression
pnpm add -D @types/bcrypt @types/cookie-parser
```

Configuration

```typescript
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env.development.local', '.env.development'],
            validationSchema: Joi.object({
                NODE_ENV: Joi.string().valid('development', 'production', 'test', 'provision').default('development'),
                PORT: Joi.number().port().default(3000),
            }),
        }),
    ],
})
export class AppModule {}
```

```typescript
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import * as csurf from 'csurf'
import * as compression from 'compression'
import helmet from 'helmet'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.enableCors()
    app.use(helmet())
    app.use(csurf())
    app.use(compression())
    app.useGlobalPipes(new ValidationPipe())
    app.use(cookieParser())

    await app.listen(3000)
}
bootstrap()
```

Validation with class-(validator/transformer) example Data Transfer Object:

```typescript
import { IsEmail, IsNotEmpty } from 'class-validator'

export class CreateUserDto {
    @IsEmail()
    email: string

    @IsNotEmpty()
    password: string
}
```

-   For authentication:

```shell
pnpm add @nestjs/passport passport passport-local @nestjs/jwt passport-jwt
pnpm add -D @types/passport-local @types/passport-jwt
```

-   For Streaming with socket.io:

```shell
pnpm add @nestjs/websockets @nestjs/platform-socket.io
```

-   For caching and jobs:

```shell
pnpm add @nestjs/bullmq bullmq
```

-   For ORM interactive with Database:

```shell
pnpm add prisma @prisma/client
npx prisma
npx prisma init
npx prisma migrate dev --name init
```

```typescript
model User {
  id    Int     @default(autoincrement()) @id
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int      @default(autoincrement()) @id
  title     String
  content   String?
  published Boolean? @default(false)
  author    User?    @relation(fields: [authorId], references: [id])
  authorId  Int?
}
```

Create prisma service file:

```typescript
import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect()
    }
}
```
