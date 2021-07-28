// Constants from the environment.

const SERVER_PORT = process.env.PORT ?? 8000;
const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID ?? "hacker-news"
const FIREBASE_DATABASE_URL = process.env.FIREBASE_DATABASE_URL ?? "https://hacker-news.firebaseio.com"

export { SERVER_PORT, FIREBASE_PROJECT_ID, FIREBASE_DATABASE_URL }
