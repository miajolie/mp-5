import { URL } from "@/types";
import { useRouter } from "next/navigation";

export default function AliasPreview({post}: {post:URL}){

    const router = useRouter();
    return(

        <div className ="bg-rose-200 rounded-xl p-4 m-2 w-96">
            {/* //is it short url or just url, but that doesnt mean its shortening :/ */}

            <button className="font-bold text-xl justify-context: center" onClick={()=> router.push(post.url)}> Visit Short URL: https://mp-5-sand.vercel.app/{post.alias}</button>
        </div>

    );
}