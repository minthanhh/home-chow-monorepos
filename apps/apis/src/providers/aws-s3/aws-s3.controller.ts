import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common'
import { AwsS3Service } from './aws-s3.service'
import { UploadImageDto, UploadImagesDto } from './dtos'

@Controller('upload')
@ApiTags('Aws s3 Upload')
export class AwsS3Controller {
    constructor(private readonly awsS3Service: AwsS3Service) {}

    @Post('image')
    @ApiOperation({ summary: 'Uploads a single file' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: UploadImageDto })
    @UseInterceptors(FileInterceptor('image'))
    async uploadImage(@UploadedFile() image: Express.Multer.File) {
        return await this.awsS3Service.uploadImage(image)
    }

    @Post('images')
    @ApiOperation({ summary: 'Uploads a multiple file' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: UploadImagesDto })
    @UseInterceptors(FilesInterceptor('images'))
    async uploadImages(@UploadedFiles() images: Express.Multer.File[]) {
        return await this.awsS3Service.uploadImages(images)
    }
}
