import { Transporter } from 'nodemailer';
export declare class MailService {
    transporter: Transporter;
    constructor();
    send(): void;
}
