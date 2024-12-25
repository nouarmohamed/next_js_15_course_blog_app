import Profile from "@/components/Profile"

const page = async({params}: {params:Promise<{id: string}>}) => {
  const id = (await params).id
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}/posts`)
  const {user, posts} = await res.json()

  return (
    <Profile user={user} posts={posts}/>
  )
}

export default page