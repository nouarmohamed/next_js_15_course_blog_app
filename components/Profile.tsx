import Image from 'next/image'
import Card from './Card'

const Profile = ({user, posts}: ProfileProps) => {
  return (
    <div className="p-6 pt-20">
      <div className="flex flex-col gap-1 items-center">
          <Image
            className="rounded-full"
            src={user?.image}
            alt={user._id}
            height={100}
            width={100}
          />
          <h1 className="text-2xl font-bold text-gray-800">{user?.username}</h1>
          <p className="text-gray-600 text-lg">{user?.email}</p>
          <p className="text-gray-500 text-lg">Member since: January 2024</p>
      </div>

      <div className="mt-8">
        <h2 className="heading mb-8">Posts</h2>
        {posts.length>0 ? (
          <ul className="card-container">
            {posts.map((post:Post)=>(
              <Card 
                key={post._id}
                id={post._id}
                title={post.title}
                content={post.content}
                author={user.username}
                authorId={user._id}
                authorImg={user.image}
                createAt={post.createAt}
              />  
            ))}
          </ul>
        ):(<div className='pt-24 flex justify-center items-center'>
              <h2 className="text-3xl sm:text-5xl font-semibold text-gray-700">
                No posts yet !
              </h2>
            </div>
          )
        }
      </div>
    </div>

  )
}

export default Profile