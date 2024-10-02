"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFound = void 0;
const common_1 = require("@nestjs/common");
const filters_1 = require("../filters");
class NotFound extends common_1.NotFoundException {
    constructor(error) {
        super(filters_1.ERROR_NOT_FOUND, error);
    }
}
exports.NotFound = NotFound;
//# sourceMappingURL=not-found.exception.js.map