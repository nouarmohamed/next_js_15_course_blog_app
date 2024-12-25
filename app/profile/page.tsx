import { auth } from "@/auth"
import Profile from "@/components/Profile"

const page = async() => {
  const session = await auth()
  const id = session?.user?.id
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}/posts`)
  const {user, posts} = await res.json()

  return (
    <Profile user={user} posts={posts}/>
  )
}

export default page