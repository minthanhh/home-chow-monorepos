"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONSTRAINT_ERRORS = exports.ERROR_CONFLICT_RESOURCE = exports.ERROR_NOT_FOUND = exports.ERROR_FORBIDDEN_RESOURCE = exports.ERROR_UNAUTHORIZED = exports.ERROR_SYSTEM = void 0;
const common_1 = require("@nestjs/common");
exports.ERROR_SYSTEM = 'error.system';
exports.ERROR_UNAUTHORIZED = 'error.unauthorized';
exports.ERROR_FORBIDDEN_RESOURCE = 'error.forbidden_resource';
exports.ERROR_NOT_FOUND = 'error.not_found';
exports.ERROR_CONFLICT_RESOURCE = 'error.conflict_resource';
exports.CONSTRAINT_ERRORS = {
    SYS_000: common_1.HttpStatus.INTERNAL_SERVER_ERROR.toString(),
    SYS_002: common_1.HttpStatus.UNPROCESSABLE_ENTITY.toString(),
    SYS_003: common_1.HttpStatus.SERVICE_UNAVAILABLE.toString(),
    SYS_004: common_1.HttpStatus.NOT_FOUND.toString(),
    USER_001: exports.ERROR_UNAUTHORIZED,
    USER_002: exports.ERROR_FORBIDDEN_RESOURCE,
    SYS_005: common_1.HttpStatus.CONFLICT.toString(),
};
//# sourceMappingURL=constraint-errors.js.map