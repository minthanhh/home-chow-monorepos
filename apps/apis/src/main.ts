import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import * as compression from 'compression'
import helmet from 'helmet'
import { ValidationPipe } from '@nestjs/common'
import { setupSwagger } from './core/setups'
import { useContainer } from 'class-validator'
import process from 'node:process'

export async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['log', 'warn', 'error', 'debug'],
        cors: true,
    })

    useContainer(app.select(AppModule), {
        fallbackOnErrors: true,
    })

    app.setGlobalPrefix('/apis')
    app.enableCors({
        allowedHeaders: 'Content-Type,Authorization',
        methods: ['POST', 'PUT', 'GET', 'DELETE', 'OPTIONS'],
        origin: ['http://localhost:3001', 'http://localhost:3000', process.env.CLIENT_URL],
        credentials: true,
    })
    app.use(helmet())
    app.use(compression())
    app.use(cookieParser())
    app.useGlobalPipes(new ValidationPipe())

    setupSwagger(app)

    const shutdown = () => {
        app.close()
            .then(() => {
                console.info('Server successfully shutdown')
                process.exit(0)
            })
            .catch((error) => {
                console.error('Error occurred during shutdown:', error)
                process.exit(1)
            })
    }

    // Listen for termination signals
    process.on('SIGTERM', shutdown)
    process.on('SIGINT', shutdown)

    await app.listen(process.env.PORT || 10000)
    console.info(`Server running on ${await app.getUrl()}`)
}

bootstrap()
