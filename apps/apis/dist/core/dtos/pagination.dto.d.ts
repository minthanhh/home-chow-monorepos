export declare class PaginationDto {
    currentPage: number;
    pageSize: number;
    totalPage?: number;
    totalRecord?: number;
    constructor(currentPage: number, pageSize: number, totalPage: number, totalRecord: number);
}
