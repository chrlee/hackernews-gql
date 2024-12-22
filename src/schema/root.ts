import {
  queryType,
  stringArg,
  subscriptionType,
  nonNull,
  intArg,
  enumType,
} from "nexus";
import type { Context } from '../context';

import { objectType } from 'nexus';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id');
  },
});

export const Item = objectType({
  name: 'Item',
  definition(t) {
    t.int('id');
  },
});

export const StoryPageEnum = enumType({
  name: 'StoryPageEnum',
  members: ['TOP', 'NEW', 'BEST', 'ASK', 'SHOW', 'JOB'],
});

export const Query = queryType({
  definition(t) {
    t.field("user", {
      type: 'User',
      args: {
        username: nonNull(
          stringArg({
            description: "username of the user.",
          }),
        ),
      },
      resolve: async (_: any, args: { username: string }, context: Context) => {
        const user = await context.loaders.userLoader.load(args.username);
        return user;
      },
    });

    t.field("item", {
      type: 'Item',
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (_: any, args: { id: number }, context: Context) => {
        const item = await context.loaders.itemLoader.load(args.id);
        return item;
      },
    });

    t.field("storyPage", {
      type: 'Item',
      args: {
        name: nonNull('StoryPageEnum'),
        first: intArg(),
        after: stringArg(),
        last: intArg(),
        before: stringArg(),
      }, 
      resolve: async (_: any, args: { name: string }, context: Context) => {
        return context.loaders.storyPageLoader.load(args.name);
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
