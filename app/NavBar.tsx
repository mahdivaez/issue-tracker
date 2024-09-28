import Link from 'next/link'
import React from 'react'
import { FaBug } from "react-icons/fa";

const Navbar = () => {
    const links =[
        {href : "/dashboard", label : "Dashboard"},
        {href : "/issue", label : "Issue"}
    ]
  return (
    <div className='text-black flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
            <Link href={"/"}><FaBug />
</Link>
            <ul className='flex space-x-5'>
                {links.map(link =><li> <Link className='text-zinc-500 hover:text-zinc-800 transition-colors' href={link.href}>{link.label}</Link></li>)}
            </ul>
    </div>
  )
}

export default Navbar