"use client";
import React from "react";
import MailIcon from "./MailIcon";
import { Button, Input } from "@nextui-org/react";

const NewsletterForm = () => {
  return (
    <div className="w-full">
      <div className="bg-zinc-700 dark:bg-zinc-950 py-8 px-9 rounded-xl text-center">
        <p className="text-center text-xl font-semibold text-base-content text-white">
          Weekly Newsletter
        </p>
        <p className="mt-2 text-base text-center text-base-content/60 text-white">
          Get blog articles and offers via email
        </p>
        <div className=" mt-7">
          <Input
            type="email"
            placeholder="Your Email"
            endContent={
              <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
          />
        </div>
        <Button radius="full" className="mt-5" size="md">
          Subscribe
        </Button>
      </div>
    </div>
  );
};

export default NewsletterForm;
