import { queryType, stringArg, nonNull } from "nexus"
import { User, Item } from "./models"
import { getUser, getItem } from "../database/helpers"

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
                const user = await getUser(username!)
                return {
                    id: user.id,
                    createdAt: new Date(user.created * 1000).toString(),
                    submitted: user.submitted,
                    about: user.about,
                    karma: user.karma
                }

            }
        }),

            t.field("item", {
                type: Item,
                args: {
                    id: nonNull(stringArg({}))
                },
                async resolve(root, { id }, ctx) {
                    const item = await getItem(id)
                    if (!item) {
                        throw new Error("No valid item found with that ID.")
                    }
                    return {
                        id: item.id,
                        title: item.title,
                        url: item.url,
                        createdAt: new Date(item.time * 1000).toString(),
                        text: item.text,
                        children: item.kids,
                        score: item.score,
                        dead: item.dead,
                        by: item.by,
                        deleted: item.deleted,
                        descendants: item.descendants,
                        poll: item.poll,
                        parent: item.parent,
                        parts: item.parts,
                        type: item.type,
                    }
                }

            })
    }
})


