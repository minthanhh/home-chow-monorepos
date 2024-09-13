import { ApiPropertyOptional } from '@nestjs/swagger'

export class PaginationDto {
    @ApiPropertyOptional({ type: Number, description: 'Trang hiện tại' })
    currentPage: number

    @ApiPropertyOptional({ type: Number, description: 'Kích thước trang (số lượng bản ghi trên một trang)' })
    pageSize: number

    @ApiPropertyOptional({ type: Number, description: 'Tổng số trang (không bắt buộc, thường được tính toán tự động)' })
    totalPage?: number

    @ApiPropertyOptional({ type: Number, description: 'Tổng số bản ghi (không bắt buộc, thường được tính toán tự động)' })
    totalRecord?: number
}
