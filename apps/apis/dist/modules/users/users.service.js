"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const shareds_1 = require("../../shareds");
const refresh_jwt_config_1 = require("./configs/refresh-jwt.config");
const mail_1 = require("../mail");
let UsersService = class UsersService {
    constructor(prismaService, jwtService, mailService, refreshJwtConfigure) {
        this.prismaService = prismaService;
        this.jwtService = jwtService;
        this.mailService = mailService;
        this.refreshJwtConfigure = refreshJwtConfigure;
    }
    async refreshToken(user) {
        const payload = { sub: user.id };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
    }
    async loginWithPhoneNumber() { }
    async verifyOtpPhoneNumber(verifyPhoneNumberDto) {
        const { phone, otp } = verifyPhoneNumberDto;
    }
    async login(user) {
        const payload = { sub: user.id };
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign(payload, this.refreshJwtConfigure);
        const refreshTokenExpiration = new Date(Date.now() + +this.refreshJwtConfigure.expiresIn);
        await this.prismaService.user.update({
            where: { id: user.id },
            data: { refreshToken, refreshTokenExpiration },
        });
        return { userId: user.id, accessToken, refreshToken };
    }
    async createUser(createUser) {
        const { email, username, password } = createUser;
        const existingUser = await this.prismaService.user.findFirst({
            where: { OR: [{ username: username }, { email: email }] },
        });
        if (existingUser)
            throw new common_1.ConflictException(`User already exists`);
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.prismaService.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
            },
        });
        const payload = { sub: user.id };
        const refreshToken = this.jwtService.sign(payload, this.refreshJwtConfigure);
        const refreshTokenExpiration = new Date(Date.now() + +this.refreshJwtConfigure.expiresIn);
        return await this.prismaService.user.update({
            where: { id: user.id },
            data: { refreshToken, refreshTokenExpiration },
        });
    }
    async getUser(userId) {
        return await this.prismaService.user.findUnique({ where: { id: userId } });
    }
    async validateUserByPhone(phone) {
        console.log('phone', phone);
        const existingUser = await this.prismaService.user.findUnique({ where: { phone: phone } });
        console.log('0867659309', existingUser);
        if (!existingUser)
            throw new common_1.NotFoundException(`Phone does not exist`);
        return existingUser;
    }
    async validateUser(username, password) {
        const existingUser = await this.prismaService.user.findUnique({ where: { email: username } });
        if (!existingUser)
            throw new common_1.NotFoundException(`User ${username} does not exist`);
        const isPasswordMatching = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordMatching)
            throw new common_1.NotFoundException('Password or username does not match');
        return existingUser;
    }
    async validateUserGoogle(profile) {
        const { emails, photos, displayName } = profile;
        const email = emails[0].value;
        const exists = await this.prismaService.user.findUnique({ where: { email } });
        if (exists)
            return exists;
        return await this.prismaService.user.create({
            data: {
                email,
                username: '',
                password: '',
                avatar: photos[0].value,
                fullName: displayName,
            },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, common_1.Inject)(refresh_jwt_config_1.default.KEY)),
    __metadata("design:paramtypes", [shareds_1.PrismaService,
        jwt_1.JwtService,
        mail_1.MailService, void 0])
], UsersService);
//# sourceMappingURL=users.service.js.map