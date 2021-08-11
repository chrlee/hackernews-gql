import { makeSchema} from "nexus"
import { join } from "node:path"
import { NEXUS_GENERATED_DIRECTORY } from "../constants"
import { User, Item, ItemEnum, PageEnum } from "./models"
import { Query, Subscribe } from "./root"

export const schema = makeSchema({
    types: [Query, Subscribe, User, Item, ItemEnum, PageEnum],
    outputs: {
        typegen: join(NEXUS_GENERATED_DIRECTORY, 'index.d.ts'),
        schema: join(NEXUS_GENERATED_DIRECTORY, 'schema.graphql')
    }
})
