import { schema } from "./schema";
import { SERVER_PORT } from "./constants";
import { createYoga } from "graphql-yoga";

const yoga = createYoga({ schema, logging: "debug" });

export default {
  port: SERVER_PORT,
  fetch: yoga,
};

console.log(`🚀 Server ready on port ${SERVER_PORT}!`);
