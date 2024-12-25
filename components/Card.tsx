import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";

const Card = async({ title, content, author, authorId, authorImg, createAt, id}: CardProps) => {
  const session = await auth()
  const canDelete = session?.user?.id === authorId

  return (
    <li className="h-60 border border-gray-400 shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
      <div className="p-4 flex items-center">
        <Link href={`/profile/${authorId}`}>
            <Image
            className="rounded-full mr-4"
            src={authorImg}
            alt={author}
            height={50}
            width={50}
            />
        </Link>
        <div>
          <h3 className="text-gray-900 font-semibold">{author}</h3>
          <p className="text-gray-600 text-sm">{new Date(createAt).toISOString().split('T')[0]}</p>
        </div>
      </div>
      <div className="px-6">
        <h2 className="text-2xl font-bold mb-2 oneLine">{title}</h2>
        <p className="text-md font-semibold text-gray-700 mb-4 twoLine">{content.substring(0, 100)}</p>
      </div>
      <div className="px-4 pb-4 flex justify-end items-center">
        {canDelete ? (
          <Link 
            href={`/post/${id}/delete`} 
            className='text-red-500 text-lg rounded-full py-2 px-4 hover:text-red-600'
          >
            Delete
          </Link>
        ) : (
          <div></div>
        )}
        <Link
          href={`/post/${id}`}
          className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors"
        >
          Read More
        </Link>
      </div>
    </li>
  );
};

export default Card;
