"use client";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import {Skeleton} from '@/app/components'
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import { useSession } from "next-auth/react";

const NavBar = () => {
  return (
    <nav className="border-b  mb-5 px-5 py-3 ">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href={"/"}>
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const pathName = usePathname();
  const Links = [
    { label: "dashbord", href: "/" },
    { label: "issues", href: "/issues" },
  ];
  return (
    <ul className="flex space-x-6 ">
      {Links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={classNames({
              "nav-link": true,
              "!text-zinc-900": link.href === pathName,
            })}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};
const AuthStatus = () => {
  const { status, data: session } = useSession();
  if (status === "loading") return <Skeleton width='2rem'/>;
  if (status === "unauthenticated")
    return (
      <Link className="nav-link" href="/api/auth/signin">
        Login
      </Link>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            size="2"
            radius="full"
            className="cursor-pointer"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Log Out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
}; 

export default NavBar;
