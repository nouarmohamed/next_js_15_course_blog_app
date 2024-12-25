'use client'

import Link from 'next/link';
import Image from 'next/image';
import { signOut, signIn, useSession } from 'next-auth/react';
import { useState } from 'react';

export default function Navbar() {
  const {data:session} = useSession()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <nav className="w-full fixed z-10 bg-gradient-to-r from-blue-100 via-purple-100 to-white px-4 sm:px-6 lg:px-24 flex items-center justify-between h-16">   
      <Link href="/">
        <p className="text-3xl text-purple-600 font-bold">Blogo</p>
      </Link>

      {/* Desktop nav */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex items-center justify-center sm:gap-4 gap-2'>
            <Link 
              href='/post/create-post'
              className='bg-black text-white hover:bg-white hover:text-black font-light sm:px-4 px-2 py-1 transition duration-200 ease-in-out border border-gray-900 rounded-full'
            >
              Create Post
            </Link>
            <button 
              type='button' 
              onClick={()=>{signOut({ callbackUrl: '/' })}}         
              className='bg-white text-black hover:bg-gray-50 font-light sm:px-4 px-2 py-1 transition duration-200 ease-in-out border border-gray-900  hover:border-gray-600 rounded-full'
            >
              Sign Out
            </button>
            <Link href='/profile'>
              <Image
                className='rounded-full'
                src={session?.user?.image || ''}
                alt={session?.user?.name || ''}
                height={40}
                width={40}
              />
            </Link>
          </div>
        ): (
          <>
            <button 
              onClick={()=>signIn()} 
              className=' bg-black text-white hover:bg-white hover:text-black font-light px-4 py-1 transition duration-200 ease-in-out border border-gray-900 rounded-full'
            >
              Sign In
            </button>
          </>
        )}
      </div>

      {/* Mobile nav */}
      <div className='sm:hidden flex'>
        {session?.user ? (
          <div>
            <button onClick={()=>setIsDropdownOpen((isDropdownOpen)=> !isDropdownOpen)}>
              <Image
                className='rounded-full'
                src={session?.user?.image || ''}
                alt={session?.user?.name || ''}
                height={45}
                width={45}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt- w-32 rounded-lg shadow-lg bg-gradient-to-r from-blue-100 via-purple-100 to-white">
                <Link 
                  href={`/profile`} 
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Profile
                </Link>
                <Link 
                  href="/post/create-post" 
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Create Post
                </Link>
                <button
                  onClick={()=> {
                    setIsDropdownOpen(false)
                    signOut({ callbackUrl: '/' })
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ): (
          <>
            <button 
              onClick={()=>signIn()} 
              className=' bg-black text-white hover:bg-white hover:text-black font-light px-4 py-1 transition duration-200 ease-in-out border border-gray-900 rounded-full'
            >
              Sign In
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
