import { RedisService } from './redis.service';
export declare class RedisController {
    private readonly redisService;
    constructor(redisService: RedisService);
    getValue(key: string): Promise<string | null>;
    setValue(key: string, value: string): Promise<void>;
}
