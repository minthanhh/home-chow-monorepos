"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisController = void 0;
const redis_service_1 = require("./redis.service");
const common_1 = require("@nestjs/common");
let RedisController = class RedisController {
    constructor(redisService) {
        this.redisService = redisService;
    }
    async getValue(key) {
        const value = await this.redisService.get(key);
        return value;
    }
    async setValue(key, value) {
        await this.redisService.set(key, value);
        return { message: 'Value set successfully' };
    }
};
exports.RedisController = RedisController;
__decorate([
    (0, common_1.Get)('get/:key'),
    __param(0, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RedisController.prototype, "getValue", null);
__decorate([
    (0, common_1.Post)('set/:key/:value'),
    __param(0, (0, common_1.Param)('key')),
    __param(1, (0, common_1.Param)('value')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RedisController.prototype, "setValue", null);
exports.RedisController = RedisController = __decorate([
    (0, common_1.Controller)('redis'),
    __param(0, (0, common_1.Inject)(redis_service_1.RedisService)),
    __metadata("design:paramtypes", [redis_service_1.RedisService])
], RedisController);
//# sourceMappingURL=redis.controller.js.map