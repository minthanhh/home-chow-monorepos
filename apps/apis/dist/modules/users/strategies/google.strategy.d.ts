import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { UsersService } from '../users.service';
import { IProfile } from '../interfaces';
declare const GoogleStrategy_base: new (...args: any[]) => Strategy;
export declare class GoogleStrategy extends GoogleStrategy_base {
    private userService;
    constructor(userService: UsersService);
    validate(_accessToken: string, _refreshToken: string, profile: IProfile, done: VerifyCallback): Promise<any>;
}
export {};
