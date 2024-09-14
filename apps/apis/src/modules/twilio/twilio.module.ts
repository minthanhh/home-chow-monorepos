import { Module } from '@nestjs/common'
import { TwilioService } from './twilio.service'
import { ConfigModule } from '@nestjs/config'
import twilioConfig from './configs/twilio.config'

@Module({
    imports: [ConfigModule.forFeature(twilioConfig)],
    providers: [TwilioService],
})
export class TwilioModule {}
