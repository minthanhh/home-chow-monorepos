"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnIngredients = returnIngredients;
const utilities_1 = require("../../../shareds/utilities");
async function returnIngredients(prisma, createIngredients) {
    const ingredientProcess = [];
    const [ingredientUuids, ingredientNames] = (0, utilities_1.extractUuidAndNameArrays)(createIngredients);
    if (ingredientUuids.length > 0) {
        ingredientProcess.push(prisma.ingredient.findMany({ where: { id: { in: ingredientUuids } } }));
    }
    if (ingredientNames.length > 0) {
        ingredientProcess.push(prisma.ingredient.createManyAndReturn({ data: ingredientNames }));
    }
    return (await Promise.all(ingredientProcess)).flat();
}
//# sourceMappingURL=return-ingredients.js.map