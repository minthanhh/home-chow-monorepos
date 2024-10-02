"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = bootstrap;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const helmet_1 = require("helmet");
const common_1 = require("@nestjs/common");
const setups_1 = require("./core/setups");
const class_validator_1 = require("class-validator");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['log', 'warn', 'error', 'debug'],
        cors: true,
    });
    (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), {
        fallbackOnErrors: true,
    });
    app.setGlobalPrefix('/apis');
    app.enableCors({
        allowedHeaders: 'Content-Type,Authorization',
        methods: ['POST', 'PUT', 'GET', 'DELETE', 'OPTIONS'],
        origin: ['http://localhost:3001', 'http://localhost:3000', process.env.CLIENT_URL],
        credentials: true,
    });
    app.use((0, helmet_1.default)());
    app.use(compression());
    app.use(cookieParser());
    app.useGlobalPipes(new common_1.ValidationPipe());
    (0, setups_1.setupSwagger)(app);
    const shutdown = () => {
        app.close()
            .then(() => {
            console.info('Server successfully shutdown');
            process.exit(0);
        })
            .catch((error) => {
            console.error('Error occurred during shutdown:', error);
            process.exit(1);
        });
    };
    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
    await app.listen(3000);
    console.info(`Server running on ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map