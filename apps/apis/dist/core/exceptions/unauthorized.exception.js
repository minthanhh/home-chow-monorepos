"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unauthorized = void 0;
const common_1 = require("@nestjs/common");
const filters_1 = require("../filters");
class Unauthorized extends common_1.UnauthorizedException {
    constructor(error) {
        super(filters_1.ERROR_UNAUTHORIZED, error);
    }
}
exports.Unauthorized = Unauthorized;
//# sourceMappingURL=unauthorized.exception.js.map