import { registerAs } from '@nestjs/config'
import { S3ClientConfig } from '@aws-sdk/client-s3'
import { AWS_S3_KEY } from '../aws-s3.constants'

export default registerAs(
    AWS_S3_KEY,
    (): S3ClientConfig => ({
        apiVersion: process.env.AWS_S3_VERSION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
        },
    }),
)
