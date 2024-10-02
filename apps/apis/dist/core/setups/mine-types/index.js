"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mime = void 0;
const other_1 = require("./types/other");
const standard_1 = require("./types/standard");
const mine_types_setup_1 = require("./mine-types.setup");
var mine_types_setup_2 = require("./mine-types.setup");
Object.defineProperty(exports, "Mime", { enumerable: true, get: function () { return mine_types_setup_2.default; } });
exports.default = new mine_types_setup_1.default(standard_1.default, other_1.default)._freeze();
//# sourceMappingURL=index.js.map