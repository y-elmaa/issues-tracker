"use client";
import { Box, Container, Flex } from "@radix-ui/themes";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import {useSession} from 'next-auth/react'

const NavBar = () => {
  const pathName = usePathname();
  const {status , data:session}=useSession()
  const Links = [
    { label: "dashbord", href: "/" },
    { label: "issues", href: "/issues" },
  ];
  return (
    <nav className="border-b  mb-5 px-5 py-3 ">
      <Container>
      <Flex justify='between'>
        <Flex align='center' gap='3'>
        <Link href={"/"}>
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6 ">
        {Links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={classNames({
                "text-zinc-900": link.href === pathName,
                "text-zinc-500": link.href !== pathName,
                "hover:text-zinc-800 transition-colors": true,
              })}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
        </Flex>
         <Box>
        {status === 'authenticated' && <Link href='/api/auth/signout'>Log Out</Link>}
        {status === 'unauthenticated' && <Link href='/api/auth/signin'>Login</Link>}
      </Box>
      </Flex>
      </Container>
     
    </nav>
  );
};

export default NavBar;


