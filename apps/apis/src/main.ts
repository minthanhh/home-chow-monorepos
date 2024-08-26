import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import * as compression from 'compression'
import helmet from 'helmet'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.setGlobalPrefix('/apis')
    app.enableCors({ origin: ['http://localhost:3001'] })
    app.use(helmet())
    app.use(compression())
    app.useGlobalPipes(new ValidationPipe())
    app.use(cookieParser())

    await app.listen(3000)
}
bootstrap()
