"use server";

import {URL} from "@/types";
import getCollection, {ALIAS_COLLECTION} from "@/db";


export default async function createUrl(
    url: string,
    alias: string
  ): Promise<{ error?: string } & Partial<URL>> {
    try {

      // const baseUrl = "https://mp-5-iota.vercel.app/";
      // const shortUrl = `${baseUrl}${alias}`;
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      const shortUrl = `${baseUrl}/${alias}`;
      // const shortUrl = `${window.location.origin}${alias}`;
      const p = { url, alias, shortUrl };
  
      // const isValidUrl = (testUrl: string) => {
      //   const urlPattern = new RegExp(
      //     "^(https?:\\/\\/)?"+
      //     "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      //     "((\\d{1,3}\\.){3}\\d{1,3}))" +
      //     "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      //     "(\\?[;&a-z\\d%_.~+=-]*)?" +
      //     "(\\#[-a-z\\d_]*)?$","i"
      //   );
      //   return !!urlPattern.test(testUrl);
      // };
      // if (!isValidUrl(url)) {
      //   return { error: "invalid_url" };
      // }

      const isValidUrl = async (testUrl: string) => {
        try {
            const response = await fetch(testUrl);
            const statusCode = response.status;

            if (statusCode >= 200 && statusCode <= 400) {
                return true; 
            } else {
                return false; 
            }
        } catch {
            return false; 
        }
    };

    if (!(await isValidUrl(url))) {
        return { error: "invalid_url" };
    }
  
      const aliasCollection = await getCollection(ALIAS_COLLECTION);
      const existing = await aliasCollection.findOne({ alias });
      if (existing) {
        return { error: "alias_already_exists" };
      }
  
      const res = await aliasCollection.insertOne(p);
      if (!res.acknowledged) {
        return { error: "db_insert_failed" };
      }
      
      const cleanData = {
        ...p,
        // id: res.insertedId.toHexString(),
        id: `{res.insertedId}`,

      };
      // return { ...p, id: res.insertedId.toHexString() };
      return cleanData;

    } catch {

      return { error: "unknown_server_error" };
    }
  }

