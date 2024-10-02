import { ForbiddenException } from '@nestjs/common';
export declare class ForbiddenResourceException extends ForbiddenException {
    constructor(error?: string);
}
