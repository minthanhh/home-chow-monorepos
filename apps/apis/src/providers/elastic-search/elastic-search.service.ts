import { Injectable } from '@nestjs/common'
import { ElasticsearchService } from '@nestjs/elasticsearch'

@Injectable()
export class ElasticSearchService {
    constructor(private readonly elasticSearchService: ElasticsearchService) {}
}
