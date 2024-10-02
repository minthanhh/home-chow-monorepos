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
exports.AwsS3Controller = void 0;
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const aws_s3_service_1 = require("./aws-s3.service");
const dtos_1 = require("./dtos");
let AwsS3Controller = class AwsS3Controller {
    constructor(awsS3Service) {
        this.awsS3Service = awsS3Service;
    }
    async uploadImage(image) {
        return await this.awsS3Service.uploadImage(image);
    }
    async uploadImages(images) {
        return await this.awsS3Service.uploadImages(images);
    }
};
exports.AwsS3Controller = AwsS3Controller;
__decorate([
    (0, common_1.Post)('image'),
    (0, swagger_1.ApiOperation)({ summary: 'Uploads a single file' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({ type: dtos_1.UploadImageDto }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AwsS3Controller.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Post)('images'),
    (0, swagger_1.ApiOperation)({ summary: 'Uploads a multiple file' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({ type: dtos_1.UploadImagesDto }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images')),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], AwsS3Controller.prototype, "uploadImages", null);
exports.AwsS3Controller = AwsS3Controller = __decorate([
    (0, common_1.Controller)('upload'),
    (0, swagger_1.ApiTags)('Aws s3 Upload'),
    __metadata("design:paramtypes", [aws_s3_service_1.AwsS3Service])
], AwsS3Controller);
//# sourceMappingURL=aws-s3.controller.js.map