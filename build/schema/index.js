"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const nexus_1 = require("nexus");
const models_1 = require("./models");
const root_1 = require("./root");
exports.schema = (0, nexus_1.makeSchema)({
    types: [root_1.Query, root_1.Subscribe, models_1.User, models_1.Item, models_1.ItemEnum, models_1.StoryPageEnum],
    plugins: [(0, nexus_1.connectionPlugin)()],
});
