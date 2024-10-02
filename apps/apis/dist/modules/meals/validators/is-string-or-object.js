"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsStringOrObject = IsStringOrObject;
const class_validator_1 = require("class-validator");
function IsStringOrObject(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isStringOrObject',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value, _args) {
                    return typeof value === 'string' || (typeof value === 'object' && value !== null);
                },
                defaultMessage(args) {
                    return `${args.property} must be a string or an object`;
                },
            },
        });
    };
}
//# sourceMappingURL=is-string-or-object.js.map