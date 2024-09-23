import { registerAs } from '@nestjs/config'
import { ELASTIC_SEARCH_KEY } from './elastic-search.constants'
import { ElasticsearchModuleOptions } from '@nestjs/elasticsearch'

export default registerAs(
    ELASTIC_SEARCH_KEY,
    (): ElasticsearchModuleOptions => ({
        node: process.env.ELASTICSEARCH_NODE,
        auth: {
            username: process.env.ELASTICSEARCH_USERNAME ?? '',
            password: process.env.ELASTICSEARCH_PASSWORD ?? '',
        },
    }),
)
