"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = exports.User = exports.StoryPageEnum = exports.ItemEnum = void 0;
const loaders_1 = require("../database/loaders");
const nexus_1 = require("nexus");
exports.ItemEnum = (0, nexus_1.enumType)({
    name: "ItemEnum",
    members: ["COMMENT", "JOB", "STORY", "POLL", "POLLOPT"],
    description: "Type of items on hackernews.",
});
exports.StoryPageEnum = (0, nexus_1.enumType)({
    name: "StoryPageEnum",
    members: ["NEW", "TOP", "BEST", "ASK", "JOB", "SHOW"],
    description: "Type of story page on hackernews.",
});
exports.User = (0, nexus_1.objectType)({
    name: "User",
    definition(t) {
        t.nonNull.string("username");
        t.nonNull.string("createdAt");
        t.string("about");
        t.nonNull.int("karma");
        t.list.nonNull.int("submission_ids");
        t.field("submissions", {
            type: (0, nexus_1.list)(exports.Item),
            async resolve(root) {
                if (!root.submission_ids?.length) {
                    return [];
                }
                const results = await loaders_1.itemLoader.loadMany(root.submission_ids);
                return results.map((item) => (item instanceof Error ? null : item));
            },
        });
    },
});
exports.Item = (0, nexus_1.objectType)({
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
            type: exports.Item,
            async resolve(root) {
                return root.parent_id ? loaders_1.itemLoader.load(root.parent_id) : null;
            },
        });
        t.string("poll");
        t.list.nonNull.int("children_ids");
        t.field("children", {
            type: (0, nexus_1.list)(exports.Item),
            async resolve(root) {
                if (!root.children_ids?.length) {
                    return [];
                }
                const results = await loaders_1.itemLoader.loadMany(root.children_ids);
                return results.map((item) => (item instanceof Error ? null : item));
            },
        });
        t.string("url");
        t.nonNull.int("score");
        t.field("type", {
            type: exports.ItemEnum,
        });
        t.field("author", {
            type: exports.User,
            async resolve(root) {
                return root.by ? loaders_1.userLoader.load(root.by) : null;
            },
        });
        t.string("title");
        t.list.string("parts");
        t.int("descendants");
    },
});
