import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Prisma } from '@prisma/client';
export declare class QueryFailedFilter implements ExceptionFilter<Prisma.PrismaClientKnownRequestError> {
    reflector: Reflector;
    constructor(reflector: Reflector);
    catch(exception: Prisma.PrismaClientKnownRequestError & {
        constraint?: string;
    }, host: ArgumentsHost): void;
}
