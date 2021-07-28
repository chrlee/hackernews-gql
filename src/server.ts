import "reflect-metadata";
import { ApolloServer } from "apollo-server-fastify";
import { fastify } from "fastify";
import { PingResolver, UserResolver } from "./resolvers";
import { } from "./schema";
import { buildSchema } from "type-graphql";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { SERVER_PORT } from "./constants"

async function start() {
    const schema = await buildSchema({
        resolvers: [PingResolver, UserResolver],
    });

    const server = new ApolloServer({
        schema,
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground({}),
        ],
    });

    const app = fastify();
    await server.start();
    app.register(server.createHandler());
    const endpoint = await app.listen(SERVER_PORT);
    console.log(`🚀 Server ready at ${endpoint}/graphql`);
}

start()
.catch((error) => {
    console.error(error)
    process.exit(0)
})