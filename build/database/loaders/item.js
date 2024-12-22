"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemLoader = exports.getItems = exports.getItem = exports.getItemRaw = void 0;
const database_1 = require("firebase/database");
const firebase_1 = require("../firebase");
const dataloader_1 = __importDefault(require("dataloader"));
async function getItemRaw(id) {
    const itemsRef = (0, database_1.ref)(firebase_1.database, "v0/item");
    const itemRef = (0, database_1.child)(itemsRef, String(id));
    const item = await (0, database_1.get)(itemRef);
    return item.val();
}
exports.getItemRaw = getItemRaw;
async function getItem(id) {
    const item = await getItemRaw(id);
    if (!item) {
        throw new Error(`No item found with id: ${id}`);
    }
    return {
        id: item.id,
        title: item.title,
        url: item.url,
        time: item.time,
        text: item.text,
        children_ids: item.kids,
        score: item.score,
        dead: item.dead,
        by: item.by,
        deleted: item.deleted,
        descendants: item.descendants,
        poll: item.poll,
        parent_id: item.parent,
        parts: item.parts,
        type: item.type?.toUpperCase(),
    };
}
exports.getItem = getItem;
function getItems(ids) {
    return Promise.all(ids.map((id) => getItem(id)));
}
exports.getItems = getItems;
exports.itemLoader = new dataloader_1.default(getItems, {
    batchScheduleFn: (callback) => setTimeout(callback, 200),
});
