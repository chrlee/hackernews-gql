"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscribe = exports.Query = void 0;
const nexus_1 = require("nexus");
const models_1 = require("./models");
const loaders_1 = require("../database/loaders");
exports.Query = (0, nexus_1.queryType)({
    definition(t) {
        t.field("user", {
            type: models_1.User,
            args: {
                username: (0, nexus_1.nonNull)((0, nexus_1.stringArg)({
                    description: "username of the user.",
                })),
            },
            async resolve(root, { username }, ctx) {
                const user = await loaders_1.userLoader.load(username);
                return user;
            },
        });
        t.field("item", {
            type: models_1.Item,
            args: {
                id: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
            },
            async resolve(root, { id }, ctx) {
                const item = await loaders_1.itemLoader.load(id);
                return item;
            },
        });
        t.connectionField("storyPage", {
            type: models_1.Item,
            additionalArgs: {
                name: (0, nexus_1.nonNull)(models_1.StoryPageEnum),
            },
            cursorFromNode(node, args, ctx, info, { index, nodes }) {
                if (args.last && !args.before) {
                    const totalCount = nodes.length;
                    return `cursor:${totalCount - args.last + index + 1}`;
                }
                return nexus_1.connectionPlugin.defaultCursorFromNode(node, args, ctx, info, {
                    index,
                    nodes,
                });
            },
            nodes(root, args) {
                return loaders_1.storyPageLoader.load(args.name);
            },
        });
    },
});
exports.Subscribe = (0, nexus_1.subscriptionType)({
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
            resolve(eventData) {
                return eventData;
            },
        });
    },
});
