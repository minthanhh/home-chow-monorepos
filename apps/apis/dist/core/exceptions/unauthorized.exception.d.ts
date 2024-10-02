import { UnauthorizedException } from '@nestjs/common';
export declare class Unauthorized extends UnauthorizedException {
    constructor(error?: string);
}
