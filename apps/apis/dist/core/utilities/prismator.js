"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheStrategy = exports.prismator = void 0;
const extension_accelerate_1 = require("@prisma/extension-accelerate");
const prismator = (model) => {
    return model.$extends((0, extension_accelerate_1.withAccelerate)());
};
exports.prismator = prismator;
exports.cacheStrategy = { swr: 60, ttl: 60 };
//# sourceMappingURL=prismator.js.map