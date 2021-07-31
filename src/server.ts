import { ApolloServer } from "apollo-server-fastify";
import { fastify } from "fastify";
import { schema } from "./schema/mod";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { SERVER_PORT } from "./constants"

async function start() {
    const server = new ApolloServer({
        schema,
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground({}),
        ],
    });

    const app = fastify();
    await server.start();
    app.register(server.createHandler());
    
    const endpoint = await app.listen({
        port: SERVER_PORT,
    });

    console.log(`🚀 Server ready at ${endpoint}/graphql`);
}

start()
.catch((error) => {
    console.error(error)
    process.exit(0)
})