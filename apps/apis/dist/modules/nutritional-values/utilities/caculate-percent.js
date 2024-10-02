"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateArrayOrNumberPercentage = calculateArrayOrNumberPercentage;
exports.calculatePercentage = calculatePercentage;
function calculateArrayOrNumberPercentage(num, totalMass) {
    if (Array.isArray(num)) {
        const numsLength = num.length;
        const percentages = [];
        for (let i = 0; i < numsLength; i++) {
            percentages.push(calculatePercentage(num[i], totalMass));
        }
        return percentages;
    }
    return calculatePercentage(num, totalMass);
}
function calculatePercentage(n, totalMass) {
    return Number(((n / totalMass) * 100).toFixed(2));
}
//# sourceMappingURL=caculate-percent.js.map