
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
            // Now we can interpret the error string ourselves
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
            setTimeout(() => setShowGif(false), 3000);
            return;
          }
        
          // No error -> proceed with success
          append(result as URL);
        } catch{
          // Defensive fallback
          setError("Unexpected error occurred! :(");
        }
        // try {
        //   const p = await createUrl(url, alias);
        //   append(p);
        // }catch (err){
        //   if (err instanceof Error){
        //     console.log('hello error:', err.message);
        //     if (err.message && err.message.includes("This Url does not exist")) {
        //       setError("The URL you entered appears invalid. Please include http:// or https://.");
        //     } else if (err.message && err.message.includes("Alias already exists")) {
        //       setError("The alias you entered is already in use. Please choose a different alias.");
        //     } else {
        //       setError(err.message || "An error occurred. Please try again.");
        //     }
        //     setShowGif(true);
        //     setTimeout(() => setShowGif(false), 3000);
        //   }
        //   else{
        //     setError("unexpected error occurred! :(");
        //   }
        // }
        // createUrl(url, alias)
        //   .then((p) => 
        //     append(p))
        //   .catch((err) => {
        //     console.log('hello error:', err.message)
        //     if (err.message && err.message.includes("This Url does not exist")) {
        //       setError(
        //         "The URL you entered appears invalid. Please include http:// or https://."
        //       );
        //     } else if (err.message && err.message.includes("Alias already exists")) {
        //       setError(
        //         "The alias you entered is already in use. Please choose a different alias."
        //       );
        //     } else {
        //       setError(err.message || "An error occurred. Please try again.");
        //     }
        //     setShowGif(true);
        //     setTimeout(() => setShowGif(false), 3000);
        //   });
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


