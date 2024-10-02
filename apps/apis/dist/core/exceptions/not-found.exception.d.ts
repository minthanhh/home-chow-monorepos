import { NotFoundException } from '@nestjs/common';
export declare class NotFound extends NotFoundException {
    constructor(error?: string);
}
