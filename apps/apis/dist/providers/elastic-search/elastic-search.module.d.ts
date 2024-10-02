import { OnApplicationShutdown } from '@nestjs/common';
export declare class ElasticSearchModule implements OnApplicationShutdown {
    onApplicationShutdown(signal?: string): void;
}
