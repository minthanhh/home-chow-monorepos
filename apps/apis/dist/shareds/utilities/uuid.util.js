"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractUuidAndNameArrays = extractUuidAndNameArrays;
const constants_1 = require("../constants");
function extractUuidAndNameArrays(l) {
    const u = [], n = [];
    const le = l.length;
    for (let i = 0; i < le; i++) {
        const p = l[i];
        if (typeof p === 'string' && constants_1.uuidRegex.test(p)) {
            u.push(p);
            continue;
        }
        else {
            const po = p;
            n.push({
                ...po,
                protein: parseInt(po.protein),
                carbohydrates: parseInt(po.carbohydrates),
                fat: parseInt(po.fat),
                quantity: parseInt(po.quantity),
            });
        }
    }
    return [u, n];
}
//# sourceMappingURL=uuid.util.js.map