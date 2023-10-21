import { ref, get, child } from "firebase/database";
import { database } from "../firebase";
import Dataloader from "dataloader";

export async function getItemRaw(id: number) {
  const itemsRef = ref(database, "v0/item");
  const itemRef = child(itemsRef, String(id));
  const item = await get(itemRef);
  return item.val();
}

export async function getItem(id: number) {
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

export function getItems(ids: readonly number[]) {
  return Promise.all(ids.map((id) => getItem(id)));
}

export const itemLoader = new Dataloader(getItems, {
  batchScheduleFn: (callback) => setTimeout(callback, 200),
});
