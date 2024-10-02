import { IsNotEmpty, IsString } from 'class-validator'

export class VerifyOtpPhoneNumberDto {
    @IsString()
    @IsNotEmpty()
    phone: string

    @IsString()
    @IsNotEmpty()
    otp: string
}
