import { Strategy } from 'passport-local';
import { UsersService } from '../users.service';
declare const PhoneStrategy_base: new (...args: any[]) => Strategy;
export declare class PhoneStrategy extends PhoneStrategy_base {
    private readonly usersService;
    constructor(usersService: UsersService);
    validate(phone: string, password: string): Promise<{
        id: string;
        email: string;
        phone: string | null;
        username: string;
        fullName: string | null;
        birthDate: string | null;
        work: string | null;
        password: string;
        address: string | null;
        avatar: string | null;
        refreshToken: string | null;
        refreshTokenExpiration: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};
