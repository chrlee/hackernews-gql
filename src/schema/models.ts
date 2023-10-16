import { userLoader, itemLoader } from "../database/loaders/mod";
import { enumType, objectType, list } from "nexus";

export const ItemEnum = enumType({
  name: "ItemEnum",
  members: ["COMMENT", "JOB", "STORY", "POLL", "POLLOPT"],
  description: "Type of items on hackernews.",
});

export const StoryPageEnum = enumType({
  name: "StoryPageEnum",
  members: ["NEW", "TOP", "BEST", "ASK", "JOB", "SHOW"],
  description: "Type of story page on hackernews.",
});

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.string("username");
    t.nonNull.string("createdAt");
    t.string("about");
    t.nonNull.int("karma");
    t.list.nonNull.int("submission_ids");
    t.field("submissions", {
      type: list(Item),
      async resolve(root) {
        if (!root.submission_ids?.length) {
          return [];
        }
        const results = await itemLoader.loadMany(root.submission_ids);
        return results.map((item) => (item instanceof Error ? null : item));
      },
    });
  },
});

export const Item = objectType({
  name: "Item",
  definition(t) {
    t.nonNull.int("id");
    t.boolean("deleted");
    t.string("by");
    t.nonNull.string("time");
    t.string("text");
    t.boolean("dead");
    t.int("parent_id");
    t.field("parent", {
      type: Item,
      async resolve(root) {
        return root.parent_id ? itemLoader.load(root.parent_id) : null;
      },
    });
    t.string("poll");
    t.list.nonNull.int("children_ids");
    t.field("children", {
      type: list(Item),
      async resolve(root) {
        if (!root.children_ids?.length) {
          return [];
        }
        const results = await itemLoader.loadMany(root.children_ids);
        return results.map((item) => (item instanceof Error ? null : item));
      },
    });
    t.string("url");
    t.nonNull.int("score");
    t.field("type", {
      type: ItemEnum,
    });
    t.field("author", {
      type: User,
      async resolve(root) {
        return root.by ? userLoader.load(root.by) : null;
      },
    });
    t.string("title");
    t.list.string("parts");
    t.int("descendants");
  },
});
