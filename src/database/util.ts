export const STORY_PAGES: Record<string, string> = {
  TOP: "topstories",
  NEW: "newstories",
  ASK: "askstories",
  SHOW: "showstories",
  JOB: "jobstories",
  BEST: "beststories",
};

export function getStoryPagePath(name: string) {
  const storyPagePath = STORY_PAGES[name];
  if (!storyPagePath) {
    throw new Error(`No page found with name: ${name}`);
  }
  return storyPagePath;
}
