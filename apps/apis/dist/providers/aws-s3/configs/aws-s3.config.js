"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const aws_s3_constants_1 = require("../aws-s3.constants");
exports.default = (0, config_1.registerAs)(aws_s3_constants_1.AWS_S3_KEY, () => ({
    apiVersion: process.env.AWS_S3_VERSION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
    },
}));
//# sourceMappingURL=aws-s3.config.js.map