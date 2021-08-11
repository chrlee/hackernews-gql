import { fastify } from "fastify";
import { schema } from "./schema/mod";
import { SERVER_PORT, GRAPHQL_PATH } from "./constants"
import { createGraphqlRouteHandler } from "./graphql_handler"

async function start() {
    const app = fastify();

    app.route({
        method: ["GET", "POST"],
        url: GRAPHQL_PATH,
        handler: createGraphqlRouteHandler(schema)
    })

    const endpoint = await app.listen({
        port: SERVER_PORT,
    });

    console.log(`🚀 Server ready at ${endpoint}${GRAPHQL_PATH}`);
}

start()
    .catch((error) => {
        console.error(error)
        process.exit(0)
    })

