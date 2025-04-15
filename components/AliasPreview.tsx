import { URL } from "@/types";
import { useRouter } from "next/navigation";

export default function AliasPreview({post}: {post:URL}){

    const router = useRouter();
    return(

        <div className ="bg-rose-200 rounded-xl p-4 m-2 w-96">
            {/* //is it short url or just url, but that doesnt mean its shortening :/ */}
            <p className="mb-4">
                <strong>Short URL:</strong> {post.shortUrl}
            </p>
            <button className="font-bold text-xl justify-context: center" onClick={()=> router.push(post.shortUrl)}> Visit Short URL</button>
        </div>

    );
}