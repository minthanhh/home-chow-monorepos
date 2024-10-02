"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsS3Service = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const common_1 = require("@nestjs/common");
const aws_s3_config_1 = require("./configs/aws-s3.config");
const utilities_1 = require("../../shareds/utilities");
const mine_types_1 = require("../../core/setups/mine-types");
let AwsS3Service = class AwsS3Service {
    constructor(awsS3Configure) {
        this._s3 = new client_s3_1.S3(awsS3Configure);
        this.bucketName = process.env.AWS_S3_BUCKET_NAME;
    }
    async uploadImage(file) {
        const key = 'images/' + utilities_1.GeneratorUtil.fileName(mine_types_1.default.getExtension(file.mimetype));
        await this._s3.putObject({
            Bucket: this.bucketName,
            Body: file.buffer,
            ACL: 'public-read',
            Key: key,
            ContentType: file.mimetype,
        });
        return `https://${this.bucketName}.s3express-az_id.region.amazonaws.com/${key}`;
    }
    async uploadImages(files) {
        return await Promise.all(files.map((file) => this.uploadImage(file)));
    }
};
exports.AwsS3Service = AwsS3Service;
exports.AwsS3Service = AwsS3Service = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(aws_s3_config_1.default.KEY)),
    __metadata("design:paramtypes", [void 0])
], AwsS3Service);
//# sourceMappingURL=aws-s3.service.js.map