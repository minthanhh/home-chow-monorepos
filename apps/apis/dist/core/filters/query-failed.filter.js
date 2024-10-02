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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryFailedFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const http_1 = require("http");
const lodash_1 = require("lodash");
const dtos_1 = require("../dtos");
const constraint_errors_1 = require("./constraint-errors");
const client_1 = require("@prisma/client");
let QueryFailedFilter = class QueryFailedFilter {
    constructor(reflector) {
        this.reflector = reflector;
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.code === 'P2002' ? common_1.HttpStatus.CONFLICT : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const metaResponseDto = new dtos_1.MetaResponseDto(status, http_1.STATUS_CODES[status], exception.constraint ?? (0, lodash_1.findKey)(constraint_errors_1.CONSTRAINT_ERRORS, (value) => value === constraint_errors_1.ERROR_SYSTEM));
        response.status(status).json(new dtos_1.ResponseDto(null, metaResponseDto));
    }
};
exports.QueryFailedFilter = QueryFailedFilter;
exports.QueryFailedFilter = QueryFailedFilter = __decorate([
    (0, common_1.Catch)(client_1.Prisma.PrismaClientKnownRequestError),
    __metadata("design:paramtypes", [core_1.Reflector])
], QueryFailedFilter);
//# sourceMappingURL=query-failed.filter.js.map