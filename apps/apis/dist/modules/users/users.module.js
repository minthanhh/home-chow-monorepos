"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const users_controller_1 = require("./users.controller");
const users_service_1 = require("./users.service");
const strategies_1 = require("./strategies");
const jwt_config_1 = require("./configs/jwt.config");
const refresh_jwt_config_1 = require("./configs/refresh-jwt.config");
const google_oauth_config_1 = require("./configs/google-oauth.config");
const mail_1 = require("../mail");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            config_1.ConfigModule.forFeature(jwt_config_1.default),
            config_1.ConfigModule.forFeature(refresh_jwt_config_1.default),
            config_1.ConfigModule.forFeature(google_oauth_config_1.default),
            jwt_1.JwtModule.registerAsync(jwt_config_1.default.asProvider()),
            mail_1.MailModule,
        ],
        providers: [users_service_1.UsersService, strategies_1.GoogleStrategy, strategies_1.LocalStrategy, strategies_1.RefreshJwtStrategy, strategies_1.JwtStrategy, mail_1.MailService, strategies_1.PhoneStrategy],
        controllers: [users_controller_1.UsersController],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map