"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const shareds_1 = require("./shareds");
const providers_1 = require("./providers");
const modules_1 = require("./modules");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cache_manager_1.CacheModule.register({ isGlobal: true }),
            providers_1.AwsS3Module,
            shareds_1.PrismaModule,
            modules_1.TodosModule,
            modules_1.UsersModule,
            modules_1.TwilioModule,
            modules_1.MailModule,
            modules_1.MealsModule,
            modules_1.IngredientsModule,
            modules_1.RecipesModule,
            modules_1.CuisinesModule,
            modules_1.NutritionalValuesModule,
            modules_1.BlogsModule,
            modules_1.OrdersModule,
            modules_1.DevicesModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map