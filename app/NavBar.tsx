import Link from 'next/link'
import React from 'react'
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
    const Links =[
        {label:'dashbord' ,href:'/'},
        {label:'issues' ,href:'/issues'},
    ]
  return (
    <nav className='flex space-x-6 border-b items-center mb-5 px-5 h-14 '>
      <Link href={'/'}><AiFillBug />
      </Link>
      <ul className='flex space-x-6 '>
        {Links.map(link=> <Link key={link.href} href={link.href} className='text-amber-700 hover:text-amber-300 transition-colors' >{link.label}</Link>)}
      </ul>
    </nav>
  )
}

export default NavBar