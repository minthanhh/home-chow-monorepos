import { ApiProperty } from '@nestjs/swagger'
import { IPaginatedMetaResult, PaginatedMetaResult } from './paginated-meta-result.dto'
export interface IPaginatedResult<T> {
    data: T[]
    meta: IPaginatedMetaResult
}

export class PaginatedResult<T> implements IPaginatedResult<T> {
    @ApiProperty({ type: [Object], description: 'The data array' })
    data: T[]

    @ApiProperty({
        description: 'Pagination metadata',
        type: () => PaginatedMetaResult, // Định nghĩa lớp cho meta
    })
    meta: IPaginatedMetaResult

    constructor(paginatedResult: { data: T[]; meta: IPaginatedMetaResult }) {
        this.data = paginatedResult.data
        this.meta = paginatedResult.meta
    }
}
