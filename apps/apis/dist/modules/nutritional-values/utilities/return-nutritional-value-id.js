"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnNutritionalValueId = returnNutritionalValueId;
const caculate_nutritional_value_1 = require("./caculate-nutritional-value");
const caculate_percent_1 = require("./caculate-percent");
async function returnNutritionalValueId(prisma, ingredients, nutritionalValueId) {
    const { protein, fat, carbohydrates, totalMass } = (0, caculate_nutritional_value_1.caculateNutritionalValue)(ingredients);
    const [proteinPercent, fatPercent, carbohydratesPercent] = (0, caculate_percent_1.calculateArrayOrNumberPercentage)([protein, fat, carbohydrates], totalMass);
    const kcal = protein * 4 + fat * 9 + carbohydrates * 4;
    const nutritionalValue = await prisma.nutritionalValue.upsert({
        where: {
            id: nutritionalValueId,
        },
        update: {
            protein: proteinPercent,
            carbohydrates: carbohydratesPercent,
            fat: fatPercent,
            kcal: kcal,
        },
        create: {
            protein: proteinPercent,
            carbohydrates: carbohydratesPercent,
            fat: fatPercent,
            kcal: kcal,
        },
    });
    return nutritionalValue.id;
}
//# sourceMappingURL=return-nutritional-value-id.js.map