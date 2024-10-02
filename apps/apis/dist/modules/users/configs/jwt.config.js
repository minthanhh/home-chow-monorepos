"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const constanst_1 = require("../constanst");
exports.default = (0, config_1.registerAs)(constanst_1.JWT_KEY, () => ({
    secret: process.env.ACCESS_JWT_SECRET,
    signOptions: {
        expiresIn: process.env.ACCESS_JWT_EXPIRES_IN,
    },
}));
//# sourceMappingURL=jwt.config.js.map