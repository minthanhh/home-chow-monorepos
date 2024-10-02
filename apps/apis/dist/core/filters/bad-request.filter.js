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
var HttpExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const lodash_1 = require("lodash");
const constraint_errors_1 = require("./constraint-errors");
const dtos_1 = require("../dtos");
let HttpExceptionFilter = HttpExceptionFilter_1 = class HttpExceptionFilter {
    constructor(reflector) {
        this.reflector = reflector;
        this.logger = new common_1.Logger(HttpExceptionFilter_1.name);
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let statusCode = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = exception.message;
        let error = '';
        if (exception instanceof common_1.HttpException) {
            statusCode = exception.getStatus();
            const r = exception.getResponse();
            message = r.message;
            error = r.error;
            this.validationFilter(message);
            this.logger.error(message);
        }
        this.logger.error(error || message, process.env.NODE_ENV !== 'production' && exception.stack);
        const metaResponseDto = new dtos_1.MetaResponseDto(statusCode, error || message.toString(), (0, lodash_1.findKey)(constraint_errors_1.CONSTRAINT_ERRORS, (value) => (0, lodash_1.includes)(value, error) || (0, lodash_1.includes)(value, message.toString()) || (0, lodash_1.includes)(value, statusCode.toString())));
        response.status(statusCode).json(new dtos_1.ResponseDto(null, metaResponseDto));
    }
    validationFilter(validationErrors) {
        for (const validationError of validationErrors) {
            const children = validationError.children;
            if (children && !(0, lodash_1.isEmpty)(children)) {
                this.validationFilter(children);
                return;
            }
            delete validationError.children;
            const constraints = validationError.constraints;
            if (!constraints) {
                return;
            }
            for (const [constraintKey, constraint] of Object.entries(constraints)) {
                if (!constraint) {
                    constraints[constraintKey] = `error.fields.${(0, lodash_1.snakeCase)(constraintKey)}`;
                }
            }
        }
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = HttpExceptionFilter_1 = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], HttpExceptionFilter);
//# sourceMappingURL=bad-request.filter.js.map