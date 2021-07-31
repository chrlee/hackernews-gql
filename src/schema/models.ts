import { objectType, enumType } from "nexus"

export const ItemType = enumType({
    name: "ItemType",
    members: ["COMMENT", "JOB", "STORY", "POLL", "POLLOPT"],
    description: "Type of items on hackernews."
})

export const User = objectType({
    name: "User",
    definition(t) {
        t.nonNull.string("id")
        t.nonNull.string("createdAt")
        t.string("about")
        t.nonNull.int("karma")
        t.list.nonNull.int("submitted")
    }
})

export const Item = objectType({
    name: "Item",
    definition(t) {
        t.nonNull.int("id")
        t.boolean("deleted")
        t.string("by")
        t.nonNull.string("createdAt")
        t.string("text")
        t.boolean("dead")
        t.int("parent")
        t.string("poll")
        t.list.string("children")
        t.string("url")
        t.int("score")
        t.field("type", {
            type: ItemType
        })
        t.nonNull.string("title")
        t.list.string("parts")
        t.int("descendants")
    }
})