"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenResourceException = void 0;
const common_1 = require("@nestjs/common");
const filters_1 = require("../filters");
class ForbiddenResourceException extends common_1.ForbiddenException {
    constructor(error) {
        super(filters_1.ERROR_FORBIDDEN_RESOURCE, error);
    }
}
exports.ForbiddenResourceException = ForbiddenResourceException;
//# sourceMappingURL=forbidden-resource.exception.js.map