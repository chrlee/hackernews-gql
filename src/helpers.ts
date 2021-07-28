import { User, Comment, Post } from "./schema"
import { ref, get, child } from "firebase/database"
import { database } from "./firebase"


export async function getUser(username: string) {
    const usersRef = ref(database, "/v0/user")
    const userRef = child(usersRef, username)
    const user = await get(userRef)
    const { id, about, karma, created } = user.val()
    const result = new User()
    result.id = id
    result.about = about
    result.karma = karma,
    result.createdAt = new Date(created * 1000)
    return result
}

export async function getItem(id: string) {
    const itemsRef = ref(database, "/v0/item")
    const itemRef = child(itemsRef, id)
    const item = await get(itemRef)
    return item.val()
}

export async function getComment(id: string) {
    const commentItem = await getItem(id)
    if (commentItem?.type !== "comment") {
        throw new Error("Not a comment.")
    }
    const comment = new Comment()
    comment.by = commentItem.by
    comment.text = commentItem.text
    comment.createdAt = new Date(commentItem.time * 1000)
    comment.children = commentItem.kids
    comment.parent = commentItem.parent
    return comment
}

export async function getPost(id: string) {
    const postItem = await getItem(id)
    const post = new Post()
    post.by = postItem.by
    post.text = postItem.text
    post.createdAt = new Date(postItem.time * 1000)
    post.comments = postItem.kids
    post.commentCount = postItem.descendants
    post.url = postItem.url
    return post
}