import { UnauthorizedException } from '@nestjs/common'
import { ERROR_UNAUTHORIZED } from '../filters'

export class Unauthorized extends UnauthorizedException {
    constructor(error?: string) {
        super(ERROR_UNAUTHORIZED, error)
    }
}
