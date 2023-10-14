export const SERVER_PORT = Number(process.env.PORT) || 8080;
export const FIREBASE_PROJECT_ID =
  process.env.FIREBASE_PROJECT_ID ?? "hacker-news";
export const FIREBASE_DATABASE_URL =
  process.env.FIREBASE_DATABASE_URL ?? "https://hacker-news.firebaseio.com";
