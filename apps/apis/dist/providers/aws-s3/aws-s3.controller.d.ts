import { AwsS3Service } from './aws-s3.service';
export declare class AwsS3Controller {
    private readonly awsS3Service;
    constructor(awsS3Service: AwsS3Service);
    uploadImage(image: Express.Multer.File): Promise<string>;
    uploadImages(images: Express.Multer.File[]): Promise<string[]>;
}
