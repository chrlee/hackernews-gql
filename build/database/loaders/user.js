"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoader = exports.getUsers = exports.getUser = exports.getUserRaw = void 0;
const database_1 = require("firebase/database");
const firebase_1 = require("../firebase");
const dataloader_1 = __importDefault(require("dataloader"));
async function getUserRaw(username) {
    const usersRef = (0, database_1.ref)(firebase_1.database, "/v0/user");
    const userRef = (0, database_1.child)(usersRef, username);
    const user = await (0, database_1.get)(userRef);
    return user.val();
}
exports.getUserRaw = getUserRaw;
async function getUser(username) {
    const user = await getUserRaw(username);
    if (!user) {
        throw new Error(`No user found with username: ${username}`);
    }
    return {
        username: user.id,
        createdAt: new Date(user.created * 1000).toISOString(),
        submission_ids: user.submitted,
        about: user.about,
        karma: user.karma,
    };
}
exports.getUser = getUser;
function getUsers(usernames) {
    return Promise.all(usernames.map((username) => getUser(username)));
}
exports.getUsers = getUsers;
exports.userLoader = new dataloader_1.default(getUsers, {
    batchScheduleFn: (callback) => setTimeout(callback, 500),
});
