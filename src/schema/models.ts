import { userLoader } from "../database/loaders/mod"
import { enumType, objectType, nonNull } from "nexus";

export const ItemEnum = enumType({
    name: "ItemType",
    members: ["COMMENT", "JOB", "STORY", "POLL", "POLLOPT"],
    description: "Type of items on hackernews.",
});

export const PageEnum = enumType({
    name: "PageType",
    members: ["NEW", "TOP", "BEST", "ASK", "JOB", "SHOW"],
    description: "Type of page on hackernews.",
});

export const User = objectType({
    name: "User",
    definition(t) {
        t.nonNull.string("username");
        t.nonNull.string("createdAt");
        t.string("about");
        t.nonNull.int("karma");
        t.list.nonNull.int("submission_ids");
    },
});

export const Item = objectType({
    name: "Item",
    definition(t) {
        t.nonNull.int("id");
        t.boolean("deleted");
        t.string("by");
        t.nonNull.string("createdAt");
        t.string("text");
        t.boolean("dead");
        t.int("parent");
        t.string("poll");
        t.list.nonNull.int("children_ids");
        t.string("url");
        t.nonNull.int("score");
        t.field("type", {
            type: ItemEnum,
        });
        t.field("author", {
            type: User,
            async resolve(root) {
                if (!root.by) {
                    return null;
                }
                return userLoader.load(root.by)
               
            }
        })
        t.nonNull.string("title");
        t.list.string("parts");
        t.int("descendants");
    },
});
