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
exports.UniqueValidator = void 0;
exports.Unique = Unique;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const globals_1 = require("../globals");
let UniqueValidator = class UniqueValidator {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async validate(value, args) {
        const [modelName, findCondition] = args.constraints;
        if (!value)
            return true;
        const record = await this.prisma[modelName]['findUnique']({
            where: findCondition(args, value),
        });
        return record === null;
    }
    defaultMessage(args) {
        return `${args.value} already exists`;
    }
};
exports.UniqueValidator = UniqueValidator;
exports.UniqueValidator = UniqueValidator = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'uniqueValidator', async: true }),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [globals_1.PrismaService])
], UniqueValidator);
function Unique(constraints, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints,
            validator: UniqueValidator,
        });
    };
}
//# sourceMappingURL=unique.validator.js.map