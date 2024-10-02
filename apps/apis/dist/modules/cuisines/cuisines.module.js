"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CuisinesModule = void 0;
const common_1 = require("@nestjs/common");
const cuisines_service_1 = require("./cuisines.service");
const cuisines_controller_1 = require("./cuisines.controller");
const shareds_1 = require("../../shareds");
let CuisinesModule = class CuisinesModule {
};
exports.CuisinesModule = CuisinesModule;
exports.CuisinesModule = CuisinesModule = __decorate([
    (0, common_1.Module)({
        controllers: [cuisines_controller_1.CuisinesController],
        providers: [cuisines_service_1.CuisinesService, shareds_1.UniqueValidator],
    })
], CuisinesModule);
//# sourceMappingURL=cuisines.module.js.map