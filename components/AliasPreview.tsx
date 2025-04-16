import { URL } from "@/types";
import { useRouter } from "next/navigation";

export default function AliasPreview({post}: {post:URL}){

    const router = useRouter();
    return(

        <div className ="bg-rose-200 rounded-xl p-4 m-2 w-96">
            {/* //is it short url or just url, but that doesnt mean its shortening :/ */}

        <h2 className="font-bold text-xl mb-2">Your Shortened URL</h2>
      <p>
        <strong>Alias:</strong> {post.alias}
      </p>
      <p>
        <strong>Short URL:</strong> {post.shortUrl}
      </p>
      <button
        className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded mt-2"
        onClick={() => router.push(`/${post.alias}`)}
      >
        Visit Short URL
      </button>

            <button className="font-bold text-xl justify-context: center" onClick={()=> router.push(`/${post.alias}`)}> Visit Short URL: https://mp-5-iota.vercel.app/{post.alias}</button>
        </div>

    );
} 