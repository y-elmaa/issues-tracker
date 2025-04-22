"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  const pathName = usePathname();
  const Links = [
    { label: "dashbord", href: "/" },
    { label: "issues", href: "/issues" },
  ];
  return (
    <nav className="flex space-x-6 border-b items-center mb-5 px-5 h-14 ">
      <Link href={"/"}>
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6 ">
        {Links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={classNames({
              "text-amber-300": link.href === pathName,
              "text-amber-900": link.href !== pathName,
              "hover:text-amber-400 transition-colors": true,
            })}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
