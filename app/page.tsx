import PostUrl from "@/components/PostUrl";


export default async function Home() {


  return (
    // styling divs 
      <div className="min-h-screen bg-gradient-to-br from-rose-100 to-pink-100 flex justify-center items-center p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl w-full">
          <h1 className="text-2xl font-bold mb-4">URL Shortener</h1>
            <PostUrl/>
          </div>
      </div>
  );
}