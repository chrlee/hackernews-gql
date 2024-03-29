import { connectionPlugin, makeSchema } from "nexus";
import { User, Item, ItemEnum, StoryPageEnum } from "./models";
import { Query, Subscribe } from "./root";
import { GraphQLSchema } from "graphql";

export const schema = makeSchema({
  types: [Query, Subscribe, User, Item, ItemEnum, StoryPageEnum],
  plugins: [connectionPlugin()],
}) as unknown as GraphQLSchema;
