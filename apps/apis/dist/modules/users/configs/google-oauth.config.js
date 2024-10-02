"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const constanst_1 = require("../constanst");
exports.default = (0, config_1.registerAs)(constanst_1.GOOGLE_KEY, () => ({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
}));
//# sourceMappingURL=google-oauth.config.js.map