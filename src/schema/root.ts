import {
  queryType,
  stringArg,
  subscriptionType,
  nonNull,
  intArg,
  connectionPlugin,
} from "nexus";
import { User, Item, StoryPageEnum } from "./models";
import {
  userLoader,
  itemLoader,
  storyPageLoader,
} from "../database/loaders";

export const Query = queryType({
  definition(t) {
    t.field("user", {
      type: User,
      args: {
        username: nonNull(
          stringArg({
            description: "username of the user.",
          }),
        ),
      },
      async resolve(root, { username }, ctx) {
        const user = await userLoader.load(username);
        return user;
      },
    });

    t.field("item", {
      type: Item,
      args: {
        id: nonNull(intArg()),
      },
      async resolve(root, { id }, ctx) {
        const item = await itemLoader.load(id);
        return item;
      },
    });

    t.connectionField("storyPage", {
      type: Item,
      additionalArgs: {
        name: nonNull(StoryPageEnum),
      },
      cursorFromNode(node, args, ctx, info, { index, nodes }) {
        if (args.last && !args.before) {
          const totalCount = nodes.length;
          return `cursor:${totalCount - args.last! + index + 1}`;
        }
        return connectionPlugin.defaultCursorFromNode(node, args, ctx, info, {
          index,
          nodes,
        });
      },
      nodes(root, args) {
        return storyPageLoader.load(args.name);
      },
    });
  },
});

export const Subscribe = subscriptionType({
  definition(t) {
    t.boolean("truths", {
      subscribe() {
        return (async function* () {
          while (true) {
            await new Promise((res) => setTimeout(res, 1000));
            yield Math.random() > 0.5;
          }
        })();
      },
      resolve(eventData: boolean | null) {
        return eventData;
      },
    });
  },
});
