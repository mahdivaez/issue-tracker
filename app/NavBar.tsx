"use client"
import Link from 'next/link'
import React from 'react'
import { FaBug } from "react-icons/fa";
import classnames from 'classnames';
import { usePathname } from 'next/navigation';
const Navbar = () => {
    const currentPath = usePathname()
    const links = [
        { href: "/", label: "Dashboard" },
        { href: "/issues", label: "Issue" }
    ]
    return (
        <div className='text-black flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
            <Link href={"/"}><FaBug />
            </Link>
            <ul className='flex space-x-5'>
                {links.map(link => <li> <Link className={classnames({
                    'text-zinc-900' : link.href === currentPath,
                    'text-zinc-400' : link.href  !== currentPath,
                    'hover:text-zinc-800 transition-colors' : true
                })} href={link.href}>{link.label}</Link></li>)}
            </ul>
        </div>
    )
}

export default Navbar