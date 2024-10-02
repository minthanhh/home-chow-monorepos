"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsS3Module = void 0;
const common_1 = require("@nestjs/common");
const aws_s3_controller_1 = require("./aws-s3.controller");
const aws_s3_service_1 = require("./aws-s3.service");
const config_1 = require("@nestjs/config");
const aws_s3_config_1 = require("./configs/aws-s3.config");
let AwsS3Module = class AwsS3Module {
};
exports.AwsS3Module = AwsS3Module;
exports.AwsS3Module = AwsS3Module = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forFeature(aws_s3_config_1.default)],
        controllers: [aws_s3_controller_1.AwsS3Controller],
        providers: [aws_s3_service_1.AwsS3Service],
        exports: [aws_s3_service_1.AwsS3Service],
    })
], AwsS3Module);
//# sourceMappingURL=aws-s3.module.js.map