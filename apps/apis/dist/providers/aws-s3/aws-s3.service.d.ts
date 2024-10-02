import awsS3Config from './configs/aws-s3.config';
import { ConfigType } from '@nestjs/config';
export declare class AwsS3Service {
    private readonly _s3;
    private bucketName;
    constructor(awsS3Configure: ConfigType<typeof awsS3Config>);
    uploadImage(file: Express.Multer.File): Promise<string>;
    uploadImages(files: Express.Multer.File[]): Promise<string[]>;
}
