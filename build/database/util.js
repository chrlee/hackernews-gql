"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStoryPagePath = exports.STORY_PAGES = void 0;
exports.STORY_PAGES = {
    TOP: "topstories",
    NEW: "newstories",
    ASK: "askstories",
    SHOW: "showstories",
    JOB: "jobstories",
    BEST: "beststories",
};
function getStoryPagePath(name) {
    const storyPagePath = exports.STORY_PAGES[name];
    if (!storyPagePath) {
        throw new Error(`No page found with name: ${name}`);
    }
    return storyPagePath;
}
exports.getStoryPagePath = getStoryPagePath;
