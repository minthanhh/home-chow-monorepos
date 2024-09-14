import { Injectable } from '@nestjs/common'
import { createTransport, Transporter } from 'nodemailer'

@Injectable()
export class MailService {
    transporter: Transporter

    constructor() {
        this.transporter = createTransport({
            host: 'sandbox.smtp.mailtrap.io',
            port: 2525,
            secure: false,
            auth: {
                user: '23f494266710be',
                pass: 'caf9ec85eae865',
            },
        })
    }

    send() {
        console.log('send-mail')
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
            ], // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Hello world?', // plain text body
            html: '<b>Hello world?</b>', // html body
        })
    }
}
