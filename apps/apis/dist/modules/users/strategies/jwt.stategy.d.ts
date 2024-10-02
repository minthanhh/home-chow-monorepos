import { Strategy } from 'passport-jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../configs/jwt.config';
import { Payload } from '../@types';
import { UsersService } from '../users.service';
import { User } from '@prisma/client';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly usersService;
    constructor(jwtConfigure: ConfigType<typeof jwtConfig>, usersService: UsersService);
    validate(payload: Payload): Promise<User>;
}
export {};
