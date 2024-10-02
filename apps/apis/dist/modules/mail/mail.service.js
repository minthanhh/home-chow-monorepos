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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer_1 = require("nodemailer");
let MailService = class MailService {
    constructor() {
        this.transporter = (0, nodemailer_1.createTransport)({
            host: 'sandbox.smtp.mailtrap.io',
            port: 2525,
            secure: false,
            auth: {
                user: '23f494266710be',
                pass: 'caf9ec85eae865',
            },
        });
    }
    send() {
        console.log('send-mail');
        this.transporter.sendMail({
            from: {
                address: 'mint03sanzz@gmail.com',
                name: 'Hồ Minh Thành',
            },
            to: [
                {
                    address: 'ho.minhh.thanh@gmail.com',
                    name: 'Minh Thành',
                },
            ],
            subject: 'Hello ✔',
            text: 'Hello world?',
            html: '<b>Hello world?</b>',
        });
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MailService);
//# sourceMappingURL=mail.service.js.map