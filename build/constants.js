"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FIREBASE_DATABASE_URL = exports.FIREBASE_PROJECT_ID = exports.SERVER_PORT = void 0;
exports.SERVER_PORT = Number(process.env.PORT) || 8080;
exports.FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID ?? "hacker-news";
exports.FIREBASE_DATABASE_URL = process.env.FIREBASE_DATABASE_URL ?? "https://hacker-news.firebaseio.com";
