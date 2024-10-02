export interface IPaginatedMetaResult {
    total: number;
    lastPage: number;
    currentPage: number;
    pageSize: number;
    prevPage: number | null;
    nextPage: number | null;
}
export declare class PaginatedMetaResult implements IPaginatedMetaResult {
    total: number;
    lastPage: number;
    currentPage: number;
    pageSize: number;
    prevPage: number | null;
    nextPage: number | null;
    constructor(meta: IPaginatedMetaResult);
}
