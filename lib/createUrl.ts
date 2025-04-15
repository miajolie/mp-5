"use server";

import {URL} from "@/types";
import getCollection, {ALIAS_COLLECTION} from "@/db";

export default async function createUrl(
    url: string,
    alias: string,


): Promise<URL>{
    console.log("creating new url");

    // change this when i deploy to vercel
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://your-app.com";
    const shortUrl = `${baseUrl}/${alias}`;

    const p = {
        url: url,
        alias: alias,
        shortUrl: shortUrl,
    };

    const isValidUrl = (url: string) => {
        var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i');
        return !!urlPattern.test(url);
    }

    if (!isValidUrl(url)){
        throw new Error ("Invalid alias: This Url does not exist");
    }

    const aliasCollection = await getCollection(ALIAS_COLLECTION);

    //check if the alias exists
    const existing = await aliasCollection.findOne({ alias });
    if (existing) {
      throw new Error ('Alias already exists');
    }
    const res= await aliasCollection.insertOne({...p});

    if (!res.acknowledged){
        throw new Error("DB insert failed");
    }
    return {...p, id:res.insertedId.toHexString()};
}
