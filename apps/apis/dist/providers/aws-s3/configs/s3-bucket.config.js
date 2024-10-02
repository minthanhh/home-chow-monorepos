"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const aws_s3_constants_1 = require("../aws-s3.constants");
exports.default = (0, config_1.registerAs)(aws_s3_constants_1.AWS_S3_BUCKET, () => ({
    bucketName: process.env.AWS_S3_BUCKET_NAME,
}));
//# sourceMappingURL=s3-bucket.config.js.map