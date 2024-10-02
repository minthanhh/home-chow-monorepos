import { Request, Response } from 'express';
import { CreateUserDto, VerifyOtpPhoneNumberDto } from './dtos';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    login(user: User): Promise<{
        userId: string;
        accessToken: string;
        refreshToken: string;
    }>;
    refreshToken(user: User): Promise<{
        accessToken: string;
    }>;
    loginWithGoogle(): Promise<void>;
    googleCallback(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getMe(user: User): Promise<{
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
    createUser(createUser: CreateUserDto): Promise<{
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
    getUserInfo(userId: string): Promise<{
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
    loginWithPhoneNumber(user: User): Promise<{
        userId: string;
        accessToken: string;
        refreshToken: string;
    }>;
    verifyOtpPhoneNumber(verifyPhoneNumberDto: VerifyOtpPhoneNumberDto): Promise<void>;
    autoVerifyPhoneNumber(): Promise<void>;
}
