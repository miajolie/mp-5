import getCollection, {ALIAS_COLLECTION} from "@/db";
import {URL} from "@/types";

export default async function getURL(): Promise<URL[]>{
    const postsCollection = await getCollection(ALIAS_COLLECTION);
    const data = await postsCollection.find().toArray();

    const posts: URL[] = data.map ((p) => ({
        id: p._id.toHexString(),
        url: p.url,
        alias: p.alias,
        shortUrl: p.shortUrl,
    }));
    
    return posts.reverse();
}