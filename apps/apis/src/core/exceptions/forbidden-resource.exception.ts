import { ForbiddenException } from '@nestjs/common'
import { ERROR_FORBIDDEN_RESOURCE } from '../filters'

export class ForbiddenResourceException extends ForbiddenException {
    constructor(error?: string) {
        super(ERROR_FORBIDDEN_RESOURCE, error)
    }
}
