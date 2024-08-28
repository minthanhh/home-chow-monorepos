import { registerAs } from '@nestjs/config'
import { TWILIO_KEY } from '../constanst'
import { ClientOpts } from 'twilio'

export default registerAs(TWILIO_KEY, (): { username: string; password: string; otps?: ClientOpts } => ({
    username: process.env.SERVICE_TWILIO_ACCOUNT_SID,
    password: process.env.SERVICE_TWILIO_AUTH_TOKEN,
}))
