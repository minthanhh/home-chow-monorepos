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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const guards_1 = require("./guards");
const dtos_1 = require("./dtos");
const users_service_1 = require("./users.service");
const shareds_1 = require("../../shareds");
const swagger_1 = require("@nestjs/swagger");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async login(user) {
        return await this.usersService.login(user);
    }
    async refreshToken(user) {
        console.log('called refreshToken');
        return await this.usersService.refreshToken(user);
    }
    async loginWithGoogle() { }
    async googleCallback(req, res) {
        const user = req.user;
        if (!user) {
            return res.status(401).send('Authentication failed');
        }
        res.redirect(`http://localhost:3001?token=${user}`);
    }
    async getMe(user) {
        const formattedTime = user.refreshTokenExpiration.toLocaleTimeString();
        console.log('Formatted', formattedTime);
        return user;
    }
    async createUser(createUser) {
        return await this.usersService.createUser(createUser);
    }
    async getUserInfo(userId) {
        return await this.usersService.getUser(userId);
    }
    async loginWithPhoneNumber(user) {
        return await this.usersService.login(user);
    }
    async verifyOtpPhoneNumber(verifyPhoneNumberDto) {
        return await this.usersService.verifyOtpPhoneNumber(verifyPhoneNumberDto);
    }
    async autoVerifyPhoneNumber() { }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.UseGuards)(guards_1.LocalAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBody)({ type: dtos_1.LoginUserDto, required: true }),
    (0, common_1.Post)('login'),
    __param(0, (0, shareds_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.RefreshAuthGuard),
    (0, common_1.Post)('refresh-token'),
    __param(0, (0, shareds_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.GoogleOAuthGuard),
    (0, common_1.Get)('login-with-google'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "loginWithGoogle", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.GoogleOAuthGuard),
    (0, common_1.Get)('google/callback'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "googleCallback", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, common_1.Get)('me'),
    __param(0, (0, shareds_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getMe", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: dtos_1.CreateUserDto, required: true }),
    (0, common_1.Post)('create-user'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Id of the user', required: true }),
    (0, common_1.Get)('user-info/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserInfo", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.PhoneAuthGuard),
    (0, common_1.Post)('login-with-phone-number'),
    __param(0, (0, shareds_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "loginWithPhoneNumber", null);
__decorate([
    (0, common_1.Post)('verify-opt-phone-number'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.VerifyOtpPhoneNumberDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "verifyOtpPhoneNumber", null);
__decorate([
    (0, common_1.Post)('auto-verify-phone-number'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "autoVerifyPhoneNumber", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map