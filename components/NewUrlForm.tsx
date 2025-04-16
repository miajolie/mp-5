
import createUrl from "@/lib/createUrl";
import { URL } from "@/types";
import {Textarea} from "@mui/joy";
import {Button, FormHelperText, TextField}from "@mui/material";
import {useState} from "react";


export default function NewUrlForm({
    append,
}:{
    append:(newPost: URL) => void;
}){
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    // const [shortUrl, setShortUrl] = useState("");
    const [error, setError] = useState("");
    const [showGif, setShowGif] = useState(false);

    return (
      <>
        <form
      className="space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();
        setError("");
        try {
          const result = await createUrl(url, alias);
        
          if (result.error) {

            if (result.error === "invalid_url") {
              setError("The URL you entered appears invalid. Please include http:// or https://.");
            } else if (result.error === "alias_already_exists") {
              setError("The alias you entered is already in use. Please choose a different alias.");
            } else if (result.error === "db_insert_failed") {
              setError("Database error. Please try again.");
            } else {
              setError("An unknown error occurred.");
            }
            setShowGif(true);
            setTimeout(() => setShowGif(false), 2000);
            return;
          }
        

          append(result as URL);
        } catch{

          setError("Unexpected error occurred! :(");
        }
        
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
        {error && (
          <div className="mt-4 text-center text-red-600 font-semibold">
            {error} - Please try again.
          </div>
        )}
      </div>
      
    </form>
      {showGif && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <img
            src={"../Homer.gif"}
            alt="Error occurred"
          />
        </div>
      )}
    </>
    );
}


