"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("./schema");
const constants_1 = require("./constants");
const graphql_yoga_1 = require("graphql-yoga");
const yoga = (0, graphql_yoga_1.createYoga)({ schema: schema_1.schema, logging: "debug" });
exports.default = {
    port: constants_1.SERVER_PORT,
    fetch: yoga,
};
console.log(`🚀 Server ready on port ${constants_1.SERVER_PORT}!`);
