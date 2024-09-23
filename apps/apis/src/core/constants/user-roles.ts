import { ValueOf } from '../types/value-of'
export const USER_ROLE = {
    ADMIN: 'admin',
    USER: 'user',
} as const

export type UserRoleType = ValueOf<typeof USER_ROLE>
