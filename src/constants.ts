// Constants from the environment.
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

export const SERVER_PORT = Number(process.env.PORT) || 8080;
export const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID ?? "hacker-news"
export const FIREBASE_DATABASE_URL = process.env.FIREBASE_DATABASE_URL ?? "https://hacker-news.firebaseio.com"
// See https://github.com/graphql-nexus/nexus/issues/657 for more details.
export const NEXUS_GENERATED_DIRECTORY = join(dirname(fileURLToPath(import.meta.url)), "..", "node_modules", "@types", "typegen-nexus")
