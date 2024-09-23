import { Module, OnApplicationShutdown } from '@nestjs/common'
import { ElasticsearchModule } from '@nestjs/elasticsearch'
import elasticSearchConfig from './elastic-search.config'

@Module({
    imports: [ElasticsearchModule.registerAsync(elasticSearchConfig.asProvider())],
    exports: [],
})
export class ElasticSearchModule implements OnApplicationShutdown {
    onApplicationShutdown(signal?: string) {
        throw new Error('Method not implemented.')
    }
}
