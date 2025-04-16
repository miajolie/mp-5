import { URL } from "@/types";
import { useRouter } from "next/navigation";
import {Button} from "@mui/material";

export default function AliasPreview({post}: {post:URL}){

    const router = useRouter();

    return(
        <div className ="bg-rose-200 rounded-xl p-6 m-4 w-full max-w-md text-center">

            <h2 className="font-bold text-xl mb-2">Your Shortened URL</h2>
            <p>
                <strong>Alias:</strong> {post.alias}
            </p>
            <p>
                <strong>Short URL:</strong> {post.shortUrl}
            </p>
        <Button
            variant="contained"
            sx={{
                backgroundColor: "#FF87A2",
                ':hover': { backgroundColor: "#CC5B75" },
                width: "120px",
            }}
            onClick={()=> router.push(`/${post.alias}`)}>
            
            Visit URL 
        </Button>       
        </div>

    );
} 