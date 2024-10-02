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
exports.ExistsValidator = void 0;
exports.Exists = Exists;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const globals_1 = require("../globals");
let ExistsValidator = class ExistsValidator {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async validate(value, args) {
        const [modelName, findCondition] = args.constraints;
        if (!value)
            return true;
        const record = await this.prisma[modelName]['findFirst']({
            where: findCondition(args, value),
        });
        return record !== null;
    }
    defaultMessage(args) {
        const [modelName] = args.constraints;
        const entity = modelName || 'Entity';
        return `The selected ${args.property} does not exist in ${entity} entity`;
    }
};
exports.ExistsValidator = ExistsValidator;
exports.ExistsValidator = ExistsValidator = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'existsValidator', async: true }),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [globals_1.PrismaService])
], ExistsValidator);
function Exists(constraints, validationOptions) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints,
            validator: ExistsValidator,
        });
    };
}
//# sourceMappingURL=exists.validator.js.map