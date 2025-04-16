// app/[alias]/page.tsx
import { redirect, notFound } from "next/navigation";
import getCollection, { ALIAS_COLLECTION } from "@/db";

export default async function AliasPage({
    params,
}: {
    params: Promise<{ alias: string }>;
}) {

    const { alias } = await params;


    const collection = await getCollection(ALIAS_COLLECTION);

    const record = await collection.findOne({ alias });


    if (!record) {
        notFound();
    }


    redirect(record.url);


  return null;
}
