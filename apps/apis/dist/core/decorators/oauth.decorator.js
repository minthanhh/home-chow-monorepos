"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtableOauth = OtableOauth;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
function OtableOauth() {
    return (0, common_1.applyDecorators)((0, common_1.UseGuards)((0, passport_1.AuthGuard)('otable')));
}
//# sourceMappingURL=oauth.decorator.js.map