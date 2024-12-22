"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storyPageLoader = exports.getStoryPages = exports.getStoryPageRaw = void 0;
const database_1 = require("firebase/database");
const firebase_1 = require("../firebase");
const dataloader_1 = __importDefault(require("dataloader"));
const util_1 = require("../util");
const item_1 = require("./item");
async function getStoryPageRaw(pageType) {
    const rootRef = (0, database_1.ref)(firebase_1.database, "/v0");
    const storyPagePath = (0, util_1.getStoryPagePath)(pageType);
    const storyPageRef = (0, database_1.child)(rootRef, storyPagePath);
    const storyPage = await (0, database_1.get)(storyPageRef);
    return storyPage.val().map((id) => (0, item_1.getItemRaw)(id));
}
exports.getStoryPageRaw = getStoryPageRaw;
function getStoryPages(pageTypes) {
    return Promise.all(pageTypes.map((pageType) => getStoryPageRaw(pageType)));
}
exports.getStoryPages = getStoryPages;
exports.storyPageLoader = new dataloader_1.default(getStoryPages, {
    batchScheduleFn: (callback) => setTimeout(callback, 200),
});
