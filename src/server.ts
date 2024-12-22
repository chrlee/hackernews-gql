import { schema } from "./schema";
import { SERVER_PORT } from "./constants";
import { createYoga } from "graphql-yoga";
import { createContext } from './context';
import { createServer } from 'http';


const yoga = createYoga({
  schema,
  logging: "debug",
  graphiql: true,
  context: createContext
});

const server = createServer(yoga);

server.listen(SERVER_PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${SERVER_PORT}/graphql`);
});
