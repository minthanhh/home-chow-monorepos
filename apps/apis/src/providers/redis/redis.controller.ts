import { RedisService } from './redis.service'
import {
    Injectable,
    Inject,
    Controller,
    Get,
    Res,
    HttpStatus,
    Param,
    NotFoundException,
    Post,
    Body,
    Put,
    Query,
    Delete,
    HttpCode,
} from '@nestjs/common'

@Controller('redis')
export class RedisController {
    constructor(@Inject(RedisService) private readonly redisService: RedisService) {}

    @Get('get/:key')
    async getValue(@Param('key') key: string): Promise<string | null> {
        const value = await this.redisService.get(key)
        return value
    }

    @Post('set/:key/:value')
    async setValue(@Param('key') key: string, @Param('value') value: string): Promise<void> {
        // @ts-ignore
        await this.redisService.set(key, value)
        // @ts-ignore
        return { message: 'Value set successfully' }
    }
}
