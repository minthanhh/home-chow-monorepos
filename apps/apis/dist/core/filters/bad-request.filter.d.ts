import type { ArgumentsHost, ExceptionFilter, UnprocessableEntityException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
export declare class HttpExceptionFilter implements ExceptionFilter {
    reflector: Reflector;
    private readonly logger;
    constructor(reflector: Reflector);
    catch(exception: UnprocessableEntityException, host: ArgumentsHost): void;
    private validationFilter;
}
