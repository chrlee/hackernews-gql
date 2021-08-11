import { join } from "node:path"
// Constants from the environment.

export const SERVER_PORT = Number(process.env.PORT) || 8080;
export const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID ?? "hacker-news"
export const FIREBASE_DATABASE_URL = process.env.FIREBASE_DATABASE_URL ?? "https://hacker-news.firebaseio.com"
// See https://github.com/graphql-nexus/nexus/issues/657 for more details.
export const NEXUS_GENERATED_DIRECTORY = join(__dirname, "..", "node_modules", "@types", "typegen-nexus")
export const GRAPHQL_PATH = "/graphql"