import { ApiProperty } from '@nestjs/swagger'

export interface IPaginatedMetaResult {
    total: number
    lastPage: number
    currentPage: number
    pageSize: number
    prevPage: number | null
    nextPage: number | null
}

export class PaginatedMetaResult implements IPaginatedMetaResult {
    @ApiProperty({ description: 'Total number of items' })
    total: number

    @ApiProperty({ description: 'Last page number' })
    lastPage: number

    @ApiProperty({ description: 'Current page number' })
    currentPage: number

    @ApiProperty({ description: 'Number of items per page' })
    pageSize: number

    @ApiProperty({ description: 'Previous page number or null' })
    prevPage: number | null

    @ApiProperty({ description: 'Next page number or null' })
    nextPage: number | null

    constructor(meta: IPaginatedMetaResult) {
        this.total = meta.total
        this.lastPage = meta.lastPage
        this.currentPage = meta.currentPage
        this.pageSize = meta.pageSize
        this.prevPage = meta.prevPage
        this.nextPage = meta.nextPage
    }
}
