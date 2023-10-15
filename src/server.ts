import { schema } from "./schema/mod";
import { SERVER_PORT } from "./constants";
import { createYoga } from "graphql-yoga";

const yoga = createYoga({ schema, logging: "debug" });
Bun.serve({
  port: SERVER_PORT,
  fetch: yoga,
});

console.log(`🚀 Server ready on port ${SERVER_PORT}!`);
