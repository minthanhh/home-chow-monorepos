import { ConflictException } from '@nestjs/common';
export declare class ConflictResourceException extends ConflictException {
    constructor(error?: string);
}
