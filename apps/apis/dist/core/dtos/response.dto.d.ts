import { PaginationDto } from './pagination.dto';
export declare class MetaResponseDto {
    statusCode: number;
    message: string;
    error: string;
    pagination: PaginationDto;
    constructor(statusCode: number, message?: string, error?: string, pagination?: PaginationDto);
}
export declare class ResponseDto<T> {
    result: {
        data: T | null;
    } | T;
    meta: MetaResponseDto;
    constructor(data: T | null, meta: MetaResponseDto);
}
