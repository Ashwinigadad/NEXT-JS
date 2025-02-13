import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";


export default async function Home({searchParams}:{
  searchParams:Promise<{query?:string}>
}) {
  const query = (await searchParams).query;
  const params = {search: query || null};

  const session=await auth();
  console.log(session?.id);
  const {data:posts} = await sanityFetch({query:STARTUPS_QUERY,params});


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
        {posts?.length > 0 ?(posts.map((post:StartupTypeCard)=>(
          <StartupCard key={post?._id} post={post}/>
        ))
      ):(
        <p className="no-results">Search not found</p>
      )}

      </ul>
   </section>

   <SanityLive/>
   </>

  );
}
