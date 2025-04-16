"use server";

import {URL} from "@/types";
import getCollection, {ALIAS_COLLECTION} from "@/db";


export default async function createUrl(
    url: string,
    alias: string
  ): Promise<{ error?: string } & Partial<URL>> {
    try {
      // (1) Validate and build the shortUrl
      const baseUrl = "https://mp-5-iota.vercel.app/";
      const shortUrl = `${baseUrl}${alias}`;
      const p = { url, alias, shortUrl };
  
      // (2) Check if valid URL
      const isValidUrl = (testUrl: string) => {
        const urlPattern = new RegExp(
          "^(https?:\\/\\/)?"+
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
          "((\\d{1,3}\\.){3}\\d{1,3}))" +
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
          "(\\?[;&a-z\\d%_.~+=-]*)?" +
          "(\\#[-a-z\\d_]*)?$","i"
        );
        return !!urlPattern.test(testUrl);
      };
      if (!isValidUrl(url)) {
        return { error: "invalid_url" };
      }
  
      // (3) Check if alias exists
      const aliasCollection = await getCollection(ALIAS_COLLECTION);
      const existing = await aliasCollection.findOne({ alias });
      if (existing) {
        return { error: "alias_already_exists" };
      }
  
      // (4) Insert into DB
      const res = await aliasCollection.insertOne(p);
      if (!res.acknowledged) {
        return { error: "db_insert_failed" };
      }
  
      // Return success data
      return { ...p, id: res.insertedId.toHexString() };
    } catch {
      // Catch *any* unexpected server error
      return { error: "unknown_server_error" };
    }
  }
// export default async function createUrl(
//     url: string,
//     alias: string,


// ): Promise<URL>{
//     // console.log("creating new url");

//     // change this when i deploy to vercel
//     const baseUrl = "https://mp-5-iota.vercel.app/";
//     const shortUrl = `${baseUrl}${alias}`;
//     // console.log("this is the shortUrl", shortUrl)

//     const p = {
//         url: url,
//         alias: alias,
//         shortUrl: shortUrl,
//     };

//     const isValidUrl = (url: string) => {
//         const urlPattern = new RegExp('^(https?:\\/\\/)?'+ 
//             '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ 
//             '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
//             '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
//             '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
//             '(\\#[-a-z\\d_]*)?$','i');
//         return !!urlPattern.test(url);
//     }

//     if (!isValidUrl(url)){
//         throw new Error ("This Url does not exist");
//     }

//     const aliasCollection = await getCollection(ALIAS_COLLECTION);

//     //check if the alias exists
//     const existing = await aliasCollection.findOne({ alias });

//     if (existing) {
//       throw new Error ("Alias already exists");
//     }
//     const res = await aliasCollection.insertOne({...p});

//     if (!res.acknowledged){
//         throw new Error("DB insert failed");
//     }
//     return {...p, id:res.insertedId.toHexString()};
// }
