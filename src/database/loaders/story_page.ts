import { ref, get, child } from "firebase/database";
import { database } from "../firebase";
import Dataloader from "dataloader";
import { getStoryPagePath } from "../util";
import { getItemRaw } from "./item";

export async function getStoryPageRaw(pageType: string) {
  const rootRef = ref(database, "/v0");
  const storyPagePath = getStoryPagePath(pageType);
  const storyPageRef = child(rootRef, storyPagePath);
  const storyPage = await get(storyPageRef);
  return storyPage.val().map((id: number) => getItemRaw(id));
}

export function getStoryPages(pageTypes: readonly string[]) {
  return Promise.all(pageTypes.map((pageType) => getStoryPageRaw(pageType)));
}

export const storyPageLoader = new Dataloader(getStoryPages, {
  batchScheduleFn: (callback) => setTimeout(callback, 200),
});
