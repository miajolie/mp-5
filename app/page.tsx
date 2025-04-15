
//import getUrl from "@/lib/getUrl";
import PostUrl from "@/components/PostUrl";
//import NewUrlForm from "@/components/NewUrlForm";

export default async function Home() {

  //const alias = await getUrl();


  return (
    // styling divs 
      <div className="flex flex-col items-center bg-pink-200 p-4">
        <h1 className="text-2xl font-bold mb-4">URL Shortener</h1>
        <PostUrl/>
      </div>
  );
}