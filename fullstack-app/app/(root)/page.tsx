import StartupCard from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
export default async function Home({searchParams}:{
  searchParams:Promise<{query?:string}>
}) {
  const query = (await searchParams).query;

  const posts=await client.fetch(STARTUPS_QUERY);
  console.log(JSON.stringify(posts,null,2))
  // const posts = [{
  //   _createdAt:new Date(),
  //   views:55,
  //   author:{_id:1,name:"Ash"},
  //   _id:1,
  //   description:"description",
  //   image:"https://wallpapers.com/images/featured/luffy-pictures-22osajj9ivjfcm49.webp",
  //   category:"Robots",
  //   title:"We Robots"
  // }]

  return (
   <>
    <section className="orange_container">
      <h1 className="heading">Pitch Your startup, <br />Connect with Startup Leaders</h1>

      <p className="sub-heading !max-w-3xl">
      Share your ideas, cast your votes on pitches, and shine in virtual competitions.      </p>
      <SearchForm query={query}/>
   </section>

   <section className="section_container">
      <p className="text-30-semibold">
        {query ? `Search results for "${query}"`: 'All Startups'}
      </p>
      <ul className="mt-7 card_grid">
        {posts?.length > 0 ?(posts.map((post:StartupCardType,index:number)=>(
          <StartupCard key={post?._id} post={post}/>
        ))
      ):(
        <p className="no-results">Search not found</p>
      )}

      </ul>
   </section>
   </>

  );
}
