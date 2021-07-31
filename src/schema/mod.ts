import { makeSchema} from "nexus"
import { join } from "node:path"
import { NEXUS_GENERATED_DIRECTORY } from "../constants"
import { User, Item, ItemType } from "./models"
import { Query } from "./root"

export const schema = makeSchema({
    types: [Query, User, Item, ItemType],
    outputs: {
        typegen: join(NEXUS_GENERATED_DIRECTORY, 'index.d.ts'),
        schema: join(NEXUS_GENERATED_DIRECTORY, 'schema.graphql')
    }
})
