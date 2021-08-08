import { ref, get, child } from "firebase/database"
import { database } from "../firebase"
import Dataloader from "dataloader"

const PAGES: Record<string, string> = {
    "TOP": "topstories",
    "NEW": "newstories",
    "ASK": "askstories",
    "SHOW": "showstories",
    "JOB": "jobstories",
}

export async function getPageRaw(name: string) {
    const pageName = PAGES[name]
    if (!pageName) {
        throw new Error(`No page found with name: ${name}`)
    }
    const pagesRef = ref(database, "/v0")
    const pageRef = child(pagesRef, pageName)
    const page = await get(pageRef)
    return page.val()
}

export async function getPage(name: string) {
    const page = await getPageRaw(name)
    if (!page) {
        throw new Error(`No page found with name: ${name}`)
    }
    return page
}

export async function getPages(names: readonly string[]) {
    const pages = await Promise.all(names.map(async name => {
        try {
            const page = await getPage(name)
            return page
        } catch (error: any) {
            return new Error(error?.message)
        }
    }))
    return pages
}

export const pageLoader = new Dataloader(getPages, {
    batchScheduleFn: callback => setTimeout(callback, 500)
})
