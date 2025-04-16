"use client";
import { URL } from "@/types";
import {useState} from "react";
import AliasPreview from "./AliasPreview";
import NewUrl from "./NewUrlForm";
/*necessary so that the home page doesnt deal with client side information stuff, was giving an error before*/

export default function PostUrl() {
    const [post, setPost] = useState<URL| null>(null);

    function append(newPost:URL){
        setPost(newPost);
    }

    return (
        <div className = "flex flex-col items-center">
            <NewUrl append={append}/>
                {post && <AliasPreview key={post.id} post={post} />}
            
        </div>
    );
}