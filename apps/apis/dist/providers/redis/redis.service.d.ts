import { Redis } from 'ioredis';
export declare class RedisService {
    private readonly redisClient;
    constructor(redisClient: Redis);
    getKeys(pattern?: string): Promise<string[]>;
    insert(key: string, value: string | number): Promise<void>;
    get(key: string): Promise<string>;
    delete(key: string): Promise<void>;
    validate(key: string, value: string): Promise<boolean>;
}
