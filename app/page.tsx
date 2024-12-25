import Card from "@/components/Card"; 
import Link from "next/link";
import Form from "next/form";
import { Search } from "lucide-react";
import SearchFormReset from "@/components/SearchFormReset";

const page = async({searchParams}: {searchParams: Promise<{query?: string}>})=>{
  const query = (await searchParams).query
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?query=${query || ''}`)
  const posts = await res.json()

  return (
    <>
      <main className="mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
        <section className="flex flex-col items-center text-center pt-40 pb-12">
          <h1 className="sm:text-7xl text-5xl font-extrabold text-gray-900">Welcome to <span className="text-purple-600">Blogo</span></h1>
          <p className="mt-4 text-lg text-gray-600">
            Share your stories, ideas, and experiences with the world.
          </p>
          <Link
            href="/post/create-post"
            className="mt-6 inline-block bg-gradient-to-r from-purple-500 to-blue-500  text-white sm:px-10 px-5 py-3 rounded-full text-lg font-normal hover:opacity-90"
          >
            Start Creating
          </Link>
          <Form action='/' className="search-form">
            <input 
              name="query"
              placeholder="Search Posts" 
              className="text-black-100 w-full h-auto outline-none"
            />

            {query && <SearchFormReset/>}

            <button type="submit">
              <Search size={30} className="text-gray-500"/>
            </button>
          </Form>
        </section>

        <section className="py-5">
          <h2 className="heading">{query? `Search results for "${query}"`:'Posts'}</h2>
          {posts.length>0 ? (
            <ul className="mt-8 card-container">
              {posts.map((post:Post)=>(
                <Card 
                  key={post._id}
                  id={post._id}
                  title={post.title}
                  content={post.content}
                  author={post.author.username}
                  authorId={post.author._id}
                  authorImg={post.author.image}
                  createAt={post.createAt}
                />  
              ))}
            </ul>
          ):(<div className='pt-24 flex justify-center items-center'>
              <h2 className="text-sm sm:text-5xl font-semibold text-gray-700">
                  No posts yet !
                </h2>
              </div>
            )
          }
        </section>
      </main>
    </>
  );
}
export default page