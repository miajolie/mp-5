
import createUrl from "@/lib/createUrl";
import { URL } from "@/types";
import {Textarea} from "@mui/joy";
import {Button, FormHelperText, TextField} from "@mui/material";
import {useState} from "react";

export default function NewUrlForm({
    append,
}:{
    append:(newPost: URL) => void;
}){
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    // const [shortUrl, setShortUrl] = useState("");

    return (
        <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        createUrl(url, alias)
          .then((p) => 
            append(p)
          )
          .catch((err) => console.error(err));
      }}
    >
      <TextField
        variant="filled"
        sx={{ backgroundColor: "white", width: "100%" }}
        label="Insert Url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <Textarea
        sx={{
          padding: "0.5rem",
          height: "100px",
          width: "100%",
          borderRadius: 0,
        }}
        variant="soft"
        placeholder="Alias"
        value={alias}
        onChange={(e) => setAlias(e.target.value)}
        required
      />
      <FormHelperText>Shorten Me?!</FormHelperText>
      <div className="w-full flex justify-center">
        <Button type="submit" variant="contained" sx={{ width: "100%" , backgroundColor: "#FF87A2" }}>
          Shorten
        </Button>
      </div>
      
    </form>
    );
}


