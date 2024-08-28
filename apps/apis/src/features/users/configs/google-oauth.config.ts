import { registerAs } from '@nestjs/config'
import { GOOGLE_KEY } from '../constanst'

export default registerAs(GOOGLE_KEY, () => ({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
}))
