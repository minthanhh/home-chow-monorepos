import { registerAs } from '@nestjs/config'
import { AWS_S3_BUCKET } from '../aws-s3.constants'

export default registerAs(AWS_S3_BUCKET, () => ({
    bucketName: process.env.AWS_S3_BUCKET_NAME,
}))
