"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.caculateNutritionalValue = caculateNutritionalValue;
function caculateNutritionalValue(ingredients) {
    return ingredients.reduce((acc, { protein, fat, carbohydrates, quantity }) => {
        acc.protein += protein * quantity;
        acc.fat += fat * quantity;
        acc.carbohydrates += carbohydrates * quantity;
        acc.totalMass += protein + fat + carbohydrates;
        return acc;
    }, { protein: 0, carbohydrates: 0, fat: 0, totalMass: 0 });
}
//# sourceMappingURL=caculate-nutritional-value.js.map