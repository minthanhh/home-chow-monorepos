import { Controller, Post, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { AwsS3Service } from './aws-s3.service'

@Controller('upload')
export class AwsS3Controller {
    constructor(private readonly awsS3Service: AwsS3Service) {}

    @Post('image')
    @UseInterceptors(FileInterceptor('image'))
    async uploadImage(image: Express.Multer.File) {
        return await this.awsS3Service.uploadImage(image)
    }

    @Post('images')
    @UseInterceptors(FileInterceptor('images'))
    async uploadImages(images: Express.Multer.File[]) {
        return await this.awsS3Service.uploadImages(images)
    }
}
