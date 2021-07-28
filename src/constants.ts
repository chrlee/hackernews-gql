// Constants from the environment.

const SERVER_PORT = Number(process.env.PORT) || 8000;
const SERVER_HOST = process.env.HOST || "0.0.0.0";
const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID ?? "hacker-news"
const FIREBASE_DATABASE_URL = process.env.FIREBASE_DATABASE_URL ?? "https://hacker-news.firebaseio.com"

export { SERVER_PORT, SERVER_HOST, FIREBASE_PROJECT_ID, FIREBASE_DATABASE_URL }
