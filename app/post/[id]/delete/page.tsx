import Form from 'next/form';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const page = async({params}:{params:Promise<{id: string}>}) => {
  const id = (await params).id

  const handleDelete = async () => {
    'use server'
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to delete post');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
    redirect('/')
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-lg text-center mx-5">
        <h1 className="text-3xl font-semibold text-red-600 mb-4">Are you sure?</h1>
        <p className="text-gray-700 text-lg mb-6">This action cannot be undone. Do you really want to delete this post?</p>
        
        <div className="flex justify-center gap-x-4">
          <Form action={handleDelete}>
            <button type='submit' className="bg-red-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-600 transition">
              Yes, Delete
            </button>
          </Form>
          <Link 
            href="/"
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-full font-semibold hover:bg-gray-400 transition"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
