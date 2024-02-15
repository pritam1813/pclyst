import React from "react";
import Link from "next/link";
import NewsletterForm from "./NewsletterForm";
import { Divider } from "@nextui-org/react";

const Footer = () => {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Archived", path: "/archived" },
    { name: "Author", path: "/author" },
    { name: "Contact", path: "/contact" },
  ];

  const categories = [
    { name: "Desktops", path: "/desktop" },
    { name: "Laptops", path: "/laptop" },
    { name: "Gaming", path: "/Gaming" },
    { name: "Smartphones", path: "/smartphones" },
    { name: "Softwares", path: "/softwares" },
  ];

  return (
    <footer className="bg-zinc-50 dark:bg-zinc-900 px-5 ">
      <div className="container mx-auto max-w-[1216px]">
        <div className="grid grid-cols-12 gap-5 py-12">
          <div className="col-span-12 lg:col-span-3">
            <h5 className="text-lg font-semibold text-base-content">Pclyst</h5>
            <p className="mt-3 text-base text-base-content/70 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam
            </p>
            <div>
              <a
                href="mailto:info@jstemplate.net"
                className="font-semibold text-base-content text-base"
              >
                Email :{" "}
                <span className="text-base-content/70 font-normal hover:text-primary hover:duration-300 transition">
                  info@jstemplate.net
                </span>
              </a>
            </div>
            <div className="mt-1">
              <a
                href="tel:880123456789"
                className="font-semibold text-base-content text-base"
              >
                Phone :{" "}
                <span className="text-base-content/70 font-normal hover:text-primary hover:duration-300 transition">
                  880 123 456 789
                </span>
              </a>
            </div>
          </div>
          <div className="flex justify-between lg:justify-center lg:gap-20 col-span-12 lg:col-span-5">
            <div>
              <h5 className="text-base-content text-lg font-semibold font-sans">
                Quick Link
              </h5>
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
              <h5 className="text-base-content text-lg font-semibold font-sans">
                Category
              </h5>
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
            <a
              className="text-base border-r border-base-content/10 pr-4 hover:text-primary transition hover:duration-300"
              href="/"
            >
              Terms of Use
            </a>
            <a
              className="text-base border-r border-base-content/10 pr-4  hover:text-primary transition hover:duration-300"
              href="/"
            >
              Privacy Policy
            </a>
            <a
              className="text-base hover:text-primary transition hover:duration-300"
              href="/"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
