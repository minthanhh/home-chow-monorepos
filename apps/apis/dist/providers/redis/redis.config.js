"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('redis', () => {
    return {
        host: process.env.REDIS_HOST,
        port: (process.env.REDIS_PORT, 10) || 6379,
        db: (process.env.REDIS_DATABASE, 10),
        keyPrefix: process.env.REDIS_KEY_PREFIX + ':',
    };
});
//# sourceMappingURL=redis.config.js.map