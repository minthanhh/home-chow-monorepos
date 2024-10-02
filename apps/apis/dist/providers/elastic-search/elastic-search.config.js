"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const elastic_search_constants_1 = require("./elastic-search.constants");
exports.default = (0, config_1.registerAs)(elastic_search_constants_1.ELASTIC_SEARCH_KEY, () => ({
    node: process.env.ELASTICSEARCH_NODE,
    auth: {
        username: process.env.ELASTICSEARCH_USERNAME ?? '',
        password: process.env.ELASTICSEARCH_PASSWORD ?? '',
    },
}));
//# sourceMappingURL=elastic-search.config.js.map