import { Inject, Injectable } from '@nestjs/common'
import { Twilio } from 'twilio'
import twilioConfig from './configs/twilio.config'
import { ConfigType } from '@nestjs/config'

@Injectable()
export class TwilioService {
    private readonly twilioClient: Twilio
    constructor(@Inject(twilioConfig.KEY) private readonly twilioConfigure: ConfigType<typeof twilioConfig>) {
        this.twilioClient = new Twilio(twilioConfigure.username, twilioConfigure.password)
    }
}
