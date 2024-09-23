import { Module } from '@nestjs/common'
import { AwsS3Controller } from './aws-s3.controller'
import { AwsS3Service } from './aws-s3.service'
import { ConfigModule } from '@nestjs/config'
import awsS3Config from './configs/aws-s3.config'

@Module({
    imports: [ConfigModule.forFeature(awsS3Config)],
    controllers: [AwsS3Controller],
    providers: [AwsS3Service],
    exports: [AwsS3Service],
})
export class AwsS3Module {}
