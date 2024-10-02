"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictResourceException = void 0;
const common_1 = require("@nestjs/common");
const filters_1 = require("../filters");
class ConflictResourceException extends common_1.ConflictException {
    constructor(error) {
        super(filters_1.ERROR_CONFLICT_RESOURCE, error);
    }
}
exports.ConflictResourceException = ConflictResourceException;
//# sourceMappingURL=conflict-resource.exception.js.map