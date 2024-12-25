'use client'

import { X } from 'lucide-react'
import Link from 'next/link'

const SearchFormReset = () => {
    const Reset = ()=> {
        const form = document.querySelector('.search-form') as HTMLFormElement
        form.reset()
    }
    return (
        <button type='reset' onClick={Reset}>
            <Link href='/'>
                <X size={35} className='text-gray-500'/>
            </Link>
        </button>
    )
}

export default SearchFormReset