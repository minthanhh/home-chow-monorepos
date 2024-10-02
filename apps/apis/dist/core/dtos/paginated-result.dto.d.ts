import { IPaginatedMetaResult } from './paginated-meta-result.dto';
export interface IPaginatedResult<T> {
    data: T[];
    meta: IPaginatedMetaResult;
}
export declare class PaginatedResult<T> implements IPaginatedResult<T> {
    data: T[];
    meta: IPaginatedMetaResult;
    constructor(paginatedResult: {
        data: T[];
        meta: IPaginatedMetaResult;
    });
}
