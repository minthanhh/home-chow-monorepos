"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginator = void 0;
const constants_1 = require("../constants");
const dtos_1 = require("../dtos");
const paginator = (defaultOptions) => {
    return async (model, args = { where: undefined }, options) => {
        const currentPage = Number(options?.currentPage || defaultOptions?.currentPage) || constants_1.CURRENT_PAGE_DEFAULT;
        const pageSize = Number(options?.pageSize || defaultOptions?.pageSize) || constants_1.PAGE_SIZE_DEFAULT;
        const skip = currentPage > 0 ? pageSize * (currentPage - 1) : 0;
        const [total, data] = await Promise.all([
            model.count({ where: args.where }),
            model.findMany({
                ...args,
                take: pageSize,
                skip,
            }),
        ]);
        const lastPage = Math.ceil(total / pageSize);
        return new dtos_1.PaginatedResult({
            data,
            meta: {
                total,
                lastPage,
                currentPage,
                pageSize,
                prevPage: currentPage > 1 ? currentPage - 1 : null,
                nextPage: currentPage < lastPage ? currentPage + 1 : null,
            },
        });
    };
};
exports.paginator = paginator;
//# sourceMappingURL=paginator.js.map