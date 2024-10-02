import twilioConfig from './configs/twilio.config';
import { ConfigType } from '@nestjs/config';
export declare class TwilioService {
    private readonly twilioConfigure;
    private readonly twilioClient;
    constructor(twilioConfigure: ConfigType<typeof twilioConfig>);
}
