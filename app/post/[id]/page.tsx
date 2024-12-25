import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";

const page = async({params}: {params:Promise<{id: string}>}) => {
    const id  = (await params).id
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`)
    const post = await res.json()
    const session = await auth()
    const canDelete = session?.user?.id === post.author._id

    return (
        <div className="min-h-screen pt-24 text-gray-900">
            <div className="max-w-4xl mx-auto py-12 sm:px-6 px-3">
                <div className="flex flex-col gap-10 justify-between h-full border border-gray-500 sm:p-10 p-5 rounded-xl shadow-2xl">
                    <div>
                        <h1 className="sm:text-5xl text-3xl font-extrabold text-center text-gray-800"> {post.title}
                        </h1>
                        <p className="sm:text-xl text-lg sm:mt-10 mt-5 text-center font-semibold text-gray-700">{post.content}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-4">
                            <Link href={`/profile/${post.author._id}`}>
                                <Image
                                className="rounded-full"
                                src={post.author.image}
                                alt={post.author._id}
                                height={52}
                                width={52}
                                />
                            </Link>
                            <div>
                                <h3 className="font-bold text-lg">{post.author.username}</h3>
                                <p className="text-sm font-semibold text-gray-700">{new Date(post.createAt).toISOString().split('T')[0]}</p>
                            </div>
                        </div>
                        {canDelete ? (
                            <Link 
                                href={`/post/${id}/delete`}
                                className="bg-red-500 rounded-full hover:bg-red-600 text-white sm:font-semibold py-2 px-3 transition duration-200"
                            >
                                Delete Post
                            </Link>
                        ) : (
                            <div></div>
                        )}
                    </div>
                </div>
            </div> 
        </div>
    );
};

export default page;
