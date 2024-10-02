"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealsModule = void 0;
const common_1 = require("@nestjs/common");
const meals_service_1 = require("./meals.service");
const meals_controller_1 = require("./meals.controller");
const ingredients_1 = require("../ingredients");
const recipes_1 = require("../recipes");
const shareds_1 = require("../../shareds");
let MealsModule = class MealsModule {
};
exports.MealsModule = MealsModule;
exports.MealsModule = MealsModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [meals_controller_1.MealsController],
        providers: [meals_service_1.MealsService, ingredients_1.IngredientsService, recipes_1.RecipesService, shareds_1.ExistsValidator],
    })
], MealsModule);
//# sourceMappingURL=meals.module.js.map