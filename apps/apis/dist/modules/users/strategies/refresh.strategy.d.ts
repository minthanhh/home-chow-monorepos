import { Payload } from '../@types';
import { Strategy } from 'passport-jwt';
import refreshJwtConfig from '../configs/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';
import { UsersService } from '../users.service';
import { User } from '@prisma/client';
declare const RefreshJwtStrategy_base: new (...args: any[]) => Strategy;
export declare class RefreshJwtStrategy extends RefreshJwtStrategy_base {
    private readonly usersService;
    constructor(refreshJwtConfigure: ConfigType<typeof refreshJwtConfig>, usersService: UsersService);
    validate(payload: Payload): Promise<User>;
}
export {};
