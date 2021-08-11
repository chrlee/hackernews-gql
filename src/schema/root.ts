import { queryType, stringArg, nonNull, list } from "nexus"
import { User, Item, PageEnum, ItemEnum } from "./models"
import { userLoader, itemLoader, pageLoader } from "../database/loaders/mod"
import { GraphQLInt } from "graphql"

export const Query = queryType({
    definition(t) {
        t.string("ping", {
            resolve: () => `Pong!, current time is ${new Date().toISOString()}`
        })
        t.field("user", {
            type: User,
            args: {
                username: nonNull(stringArg({
                    description: "username of the user."
                })),
            },
            async resolve(root, { username }, ctx) {
                const user = await userLoader.load(username)
                return user
            }
        }),

            t.field("item", {
                type: Item,
                args: {
                    id: nonNull(stringArg({}))
                },
                async resolve(root, { id }, ctx) {
                    const item = await itemLoader.load(id)
                    return item
                }

            }),

            t.field("page", {
                type: list(GraphQLInt),
                args: {
                    name: nonNull(PageEnum)
                },
                async resolve(root, { name }, ctx) {
                    return pageLoader.load(name)
                }
            })
    }
})


