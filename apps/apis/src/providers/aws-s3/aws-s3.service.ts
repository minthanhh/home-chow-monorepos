import { S3 } from '@aws-sdk/client-s3'
import { Inject, Injectable } from '@nestjs/common'
import awsS3Config from './configs/aws-s3.config'
import { ConfigType } from '@nestjs/config'
import { GeneratorUtil } from 'src/shareds/utilities'
import mine from '../../core/setups/mine-types'
@Injectable()
export class AwsS3Service {
    private readonly _s3: S3
    private bucketName: string

    constructor(@Inject(awsS3Config.KEY) awsS3Configure: ConfigType<typeof awsS3Config>) {
        this._s3 = new S3(awsS3Configure)
        this.bucketName = process.env.AWS_S3_BUCKET_NAME
    }

    async uploadImage(file: Express.Multer.File): Promise<string> {
        const key = 'images/' + GeneratorUtil.fileName(mine.getExtension(file.mimetype))
        await this._s3.putObject({
            Bucket: this.bucketName,
            Body: file.buffer,
            ACL: 'public-read',
            Key: key,
            ContentType: file.mimetype,
        })
        return `https://${this.bucketName}.s3express-az_id.region.amazonaws.com/${key}`
    }

    async uploadImages(files: Express.Multer.File[]) {
        return await Promise.all(files.map((file) => this.uploadImage(file)))
    }
}
