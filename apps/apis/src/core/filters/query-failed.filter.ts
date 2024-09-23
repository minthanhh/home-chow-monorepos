import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common'
import { Catch, HttpStatus } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import type { Response } from 'express'
import { STATUS_CODES } from 'http'
import { findKey } from 'lodash'

import { MetaResponseDto, ResponseDto } from '../dtos'
import { CONSTRAINT_ERRORS, ERROR_SYSTEM } from './constraint-errors'
import { Prisma } from '@prisma/client'

@Catch(Prisma.PrismaClientKnownRequestError)
export class QueryFailedFilter implements ExceptionFilter<Prisma.PrismaClientKnownRequestError> {
    constructor(public reflector: Reflector) {}

    catch(exception: Prisma.PrismaClientKnownRequestError & { constraint?: string }, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()

        const status = exception.code === 'P2002' ? HttpStatus.CONFLICT : HttpStatus.INTERNAL_SERVER_ERROR
        // Prisma error code P2002 indicates a unique constraint violation

        const metaResponseDto = new MetaResponseDto(
            status,
            STATUS_CODES[status],
            exception.constraint ?? findKey(CONSTRAINT_ERRORS, (value) => value === ERROR_SYSTEM),
        )

        response.status(status).json(new ResponseDto(null, metaResponseDto))
    }
}
