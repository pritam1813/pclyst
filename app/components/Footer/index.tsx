import React from "react";
import Link from "next/link";
import NewsletterForm from "./NewsletterForm";
import { Divider } from "@nextui-org/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Archived", path: "/archived" },
    { name: "Author", path: "/author" },
    { name: "Contact", path: "/contact" },
  ];

  const categories = [
    { name: "Desktops", path: "/posts/category/desktops" },
    { name: "Laptops", path: "/posts/category/laptops" },
    { name: "Gaming", path: "/posts/category/gaming" },
    { name: "Smartphones", path: "/posts/category/smartphones" },
    { name: "Softwares", path: "/posts/category/softwares" },
  ];

  const socials = [
    {
      name: "Facebook",
      icon: faFacebookF,
      link: "https://www.facebook.com/pclyst",
    },
    {
      name: "Instagram",
      icon: faInstagram,
      link: "https://instagram.com/pclyst",
    },
    {
      name: "Twitter",
      icon: faXTwitter,
      link: "https://twitter.com/Pclystcom",
    },
  ];

  return (
    <footer className="bg-zinc-50 dark:bg-zinc-900 px-5 ">
      <div className="container mx-auto max-w-[1216px]">
        <div className="grid grid-cols-12 gap-5 py-12">
          <div className="col-span-12 lg:col-span-3">
            <p className="text-lg font-semibold text-base-content">Pclyst</p>
            <p className="mt-3 text-base text-base-content/70 mb-6">
              We will help you make informed decisions and get the most out of
              your devices. Follow Pclyst and stay updated on the latest trends
              and innovations in the tech world.
            </p>
            <div className="flex gap-4">
              {socials.map((item, index) => (
                <Link
                  href={item.link}
                  key={index}
                  aria-label={`${item.name} Link of Pclyst`}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className={`${
                      item.icon == faFacebookF ? "w-3" : "w-5"
                    } transition ease-in-out hover:-translate-y-1 hover:scale-110`}
                  />
                </Link>
              ))}
            </div>
          </div>
          <div className="flex justify-between lg:justify-center lg:gap-20 col-span-12 lg:col-span-5">
            <div>
              <p className="text-base-content text-lg font-semibold font-sans">
                Quick Link
              </p>
              <div className="flex flex-col gap-y-2 mt-6">
                {quickLinks.map((link, index) => (
                  <div key={index}>
                    <Link
                      className="link link-hover text-base text-base-content/70 hover:text-primary transition hover:duration-300"
                      href={link.path}
                    >
                      {link.name}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-base-content text-lg font-semibold font-sans">
                Category
              </p>
              <div className="flex flex-col gap-y-2 mt-6">
                {categories.map((category, index) => (
                  <div key={index}>
                    <Link
                      className="link link-hover text-base text-base-content/70 hover:text-primary transition hover:duration-300"
                      href={category.path}
                    >
                      {category.name}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-4">
            <NewsletterForm />
          </div>
        </div>
        <Divider className="my-4" />
        <div className="flex flex-col gap-4 md:gap-0 md:flex-row items-center justify-between py-2 bg-base-200 ">
          <div className="flex items-center gap-2.5">
            <div>
              <h4 className="text-xl text-base-content font-sans">
                <strong>PCLYST</strong>
              </h4>
              <p className="mt-0.5 text-base-content/70 text-base">
                © {new Date().getFullYear()}. All Rights Reserved.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-base-content/70">
            <Link
              className="text-base border-r border-base-content/10 pr-4 hover:text-primary transition hover:duration-300"
              href="/terms"
            >
              Terms of Use
            </Link>
            <Link
              className="text-base border-r border-base-content/10 pr-4  hover:text-primary transition hover:duration-300"
              href="/privacypolicy"
            >
              Privacy Policy
            </Link>
            <Link
              className="text-base hover:text-primary transition hover:duration-300"
              href="/cookiepolicy"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
