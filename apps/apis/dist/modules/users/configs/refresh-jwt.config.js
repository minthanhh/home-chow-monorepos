"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const constanst_1 = require("../constanst");
exports.default = (0, config_1.registerAs)(constanst_1.REFRESH_JWT_KEY, () => ({
    secret: process.env.REFRESH_JWT_SECRET,
    expiresIn: process.env.REFRESH_JWT_EXPIRES_IN,
}));
//# sourceMappingURL=refresh-jwt.config.js.map