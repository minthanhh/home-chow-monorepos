import { ApiProperty } from '@nestjs/swagger'

export class UploadImagesDto {
    @ApiProperty({
        type: 'array',
        items: {
            type: 'string',
            format: 'binary',
        },
        description: 'The image file to upload',
    })
    images: Express.Multer.File[]
}
