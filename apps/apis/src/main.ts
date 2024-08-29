import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import * as compression from 'compression'
import helmet from 'helmet'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['log', 'warn', 'error', 'debug'],
        cors: true,
    })

    app.setGlobalPrefix('/apis')
    app.enableCors({
        allowedHeaders: 'Content-Type,Authorization',
        methods: ['POST', 'PUT', 'GET', 'DELETE'],
        origin: ['http://localhost:3001'],
        credentials: true,
    })
    app.use(helmet())
    app.use(compression())
    app.use(cookieParser())
    app.useGlobalPipes(new ValidationPipe())

    const config = new DocumentBuilder().setTitle('Cats example').setDescription('The cats API description').setVersion('1.0').addTag('cats').build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, document)

    await app.listen(3000)
}
bootstrap()
