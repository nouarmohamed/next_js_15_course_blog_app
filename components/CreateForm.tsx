'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const CreateForm = () => {
    const {data:session} = useSession()
    const userId = session?.user?.id
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        try {
        const res = await fetch('/api/posts/new', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({userId, title, content }),
        });

        if (!res.ok) {
            throw new Error('Failed to create post');
        }
        router.push('/');
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='bg-white p-10 rounded-2xl'>
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold text-lg mb-2">
                    Title
                </label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter post title"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-semibold text-lg mb-2">
                    Content
                </label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows={6}
                    placeholder="Enter post content"
                />
            </div>

            <div className='flex items-center justify-end gap-4'>
                <Link href='/' className='text-gray-500 text-lg rounded-full py-2 px-4 hover:bg-gray-200'>
                    Cancel
                </Link>
                <button
                    type="submit"
                    className={`py-2 px-4  bg-purple-500 text-white rounded-full ${loading ? 'opacity-50' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Creating...' : 'Create Post'}
                </button>
            </div>
        </form>
    )
}

export default CreateForm