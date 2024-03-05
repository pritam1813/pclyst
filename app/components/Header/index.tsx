"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import Link from "next/link";
import dynamic from "next/dynamic";

const ThemeSwitcher = dynamic(() => import("../ThemeSwitcher"));

const navMenu = [
  {
    title: "Desktops",
    link: "/posts/category/desktops",
  },
  {
    title: "Laptops",
    link: "/posts/category/laptops",
  },
  {
    title: "Gaming",
    link: "/posts/category/gaming",
  },
  {
    title: "Softwares",
    link: "/posts/category/softwares",
  },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/" className="text-3xl font-bold text-inherit">
            PCLYST
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navMenu.map((item, index) => (
          <NavbarItem key={index} isActive={pathname === item.link}>
            <Link
              href={item.link}
              className={`${
                pathname === item.link ? "active text-primary" : ""
              }`}
            >
              {item.title}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {navMenu.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className={`w-full ${
                pathname === item.link ? "active text-primary" : ""
              }`}
              href={item.link}
            >
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
