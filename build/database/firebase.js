"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = exports.firebaseClient = void 0;
const app_1 = require("firebase/app");
const database_1 = require("firebase/database");
const constants_1 = require("../constants");
const firebaseClient = (0, app_1.initializeApp)({
    projectId: constants_1.FIREBASE_PROJECT_ID,
    databaseURL: "https://hacker-news.firebaseio.com",
});
exports.firebaseClient = firebaseClient;
const database = (0, database_1.getDatabase)(firebaseClient);
exports.database = database;
