// import { CACHE_MANAGER, CacheModuleAsyncOptions } from '@nestjs/cache-manager';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { RedisStore, redisStore } from 'cache-manager-redis-store';
// import { Inject, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
// import { Cache } from 'cache-manager';
// import { CacheService } from '../services/cache.service';

// export const RedisOptions: CacheModuleAsyncOptions = {
//   isGlobal: true,
//   imports: [ConfigModule],
//   useFactory: async (configService: ConfigService) => {
//     const store = await redisStore({
//       socket: {
//         host: configService.get<string>('API_REDIS_HOST'),
//         port: parseInt(configService.get<string>('API_REDIS_PORT')!),
//         connectTimeout: 3000,
//         reconnectStrategy(retries: number): number | Error {
//           if (retries > 39) {
//             console.log('Redis - Max Connection Retries - Exiting')
//           }
//           return 3000;
//         },
//         tls: process.env.NODE_ENV !== 'local',
//         rejectUnauthorized: false,
//       },
//     });
//     return {
//       store: () => store,
//     };
//   },
//   inject: [ConfigService],
// };

// export class RedisClientEventListener implements OnModuleInit, OnModuleDestroy {
//   private readonly logger = new Logger(RedisClientEventListener.name);
//   private readonly redisStore: RedisStore;

//   constructor(@Inject(CACHE_MANAGER) readonly cacheManager: Cache) {
//     this.redisStore = cacheManager.store as unknown as RedisStore;
//   }

//   onModuleInit(): void {
//     console.log("starting AppModule...")
//     const client = this.redisStore.getClient();

//     if (!client) {
//       this.logger.error('no redis client initialised');
//       CacheService.isHealthy = false;
//     }

//     if (client.isReady) {
//       this.logger.log('redis client is connected and ready'); // initial connection to redis upon node app starting, never triggered again
//       CacheService.isHealthy = true;
//     }

//     client.on('connect', () => {
//       this.logger.log('redis client is connecting to server...');
//     });

//     client.on('ready', () => {
//       this.logger.log('redis client is ready'); // after re-connecting to redis successfully this gets triggered
//       CacheService.isHealthy = true;
//     });

//     client.on('end', () => {
//       this.logger.log('redis client connection closed');
//       CacheService.isHealthy = false;
//     });

//     client.on('error', (error: Error) => {
//       this.logger.error(error, 'redis client received an error'); // redis server dies/connection stopped this gets triggered
//       CacheService.isHealthy = false;
//     });
//   }

//   async onModuleDestroy(): Promise<void> {
//     await this.redisStore.getClient().quit();
//   }
// }

import { registerAs } from '@nestjs/config'

export default registerAs('redis', () => {
    return {
        host: process.env.REDIS_HOST,
        port: (process.env.REDIS_PORT, 10) || 6379,
        db: (process.env.REDIS_DATABASE, 10),
        keyPrefix: process.env.REDIS_KEY_PREFIX + ':',
        // ...(process.env.REDIS_USERNAME && {
        //   username: process.env.REDIS_USERNAME,
        // }),
        // ...(process.env.REDIS_PASSWORD && {
        //   password: process.env.REDIS_PASSWORD,
        // }),
    }
})
