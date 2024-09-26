import { CURRENT_PAGE_DEFAULT, PAGE_SIZE_DEFAULT } from '../constants'
import { IPaginatedResult, PaginatedResult } from '../dtos'

export type PaginateOptions = { currentPage?: number | string; pageSize?: number | string }
export type PaginateFunction<T, K> = (model: any, args?: K, options?: PaginateOptions) => Promise<IPaginatedResult<T>>

export const paginator = <T, K = any>(defaultOptions: PaginateOptions): PaginateFunction<T, K> => {
    return async (model, args: any = { where: undefined }, options) => {
        const currentPage = Number(options?.currentPage || defaultOptions?.currentPage) || CURRENT_PAGE_DEFAULT
        const pageSize = Number(options?.pageSize || defaultOptions?.pageSize) || PAGE_SIZE_DEFAULT

        const skip = currentPage > 0 ? pageSize * (currentPage - 1) : 0
        const [total, data] = await Promise.all([
            model.count({ where: args.where }),
            model.findMany({
                ...args,
                take: pageSize,
                skip,
            }),
        ])
        const lastPage = Math.ceil(total / pageSize)

        return new PaginatedResult<T>({
            data,
            meta: {
                total,
                lastPage,
                currentPage,
                pageSize,
                prevPage: currentPage > 1 ? currentPage - 1 : null,
                nextPage: currentPage < lastPage ? currentPage + 1 : null,
            },
        })
    }
}
