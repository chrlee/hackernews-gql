import { ref, get, child } from "firebase/database"
import { database } from "./firebase"

export async function getUser(username: string) {
    const usersRef = ref(database, "/v0/user")
    const userRef = child(usersRef, username)
    const user = await get(userRef)
    return user.val()
}

export async function getItem(id: string) {
    const itemsRef = ref(database, "/v0/item")
    const itemRef = child(itemsRef, id)
    const item = await get(itemRef)
    return item.val()
}