"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const constanst_1 = require("../constanst");
exports.default = (0, config_1.registerAs)(constanst_1.TWILIO_KEY, () => ({
    username: process.env.SERVICE_TWILIO_ACCOUNT_SID,
    password: process.env.SERVICE_TWILIO_AUTH_TOKEN,
}));
//# sourceMappingURL=twilio.config.js.map