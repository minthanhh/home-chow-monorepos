import { IPaginatedResult } from '../dtos';
export type PaginateOptions = {
    currentPage?: number | string;
    pageSize?: number | string;
};
export type PaginateFunction<T, K> = (model: any, args?: K, options?: PaginateOptions) => Promise<IPaginatedResult<T>>;
export declare const paginator: <T, K = any>(defaultOptions: PaginateOptions) => PaginateFunction<T, K>;
