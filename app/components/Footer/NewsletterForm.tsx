"use client";
import React, { useState } from "react";
import MailIcon from "./MailIcon";
import { Button, Input } from "@nextui-org/react";
import { z } from "zod";

interface ResponseMessage {
  status: number;
  message: string;
}

const NewsletterForm = () => {
  const [value, setValue] = useState("");
  const [responseMessage, setResponseMessage] = useState<ResponseMessage>({
    status: 0,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [validEmail, setValidEmail] = useState(true);

  const handleSubmit = async () => {
    const result = z.string().email().safeParse(value);
    setValidEmail(result.success);
    if (result.success) {
      setLoading(true);
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: value }),
      });
      const data = await res.json();
      setResponseMessage(data);
      setLoading(false);
      //console.log(data);
    }
  };

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
            isInvalid={!validEmail || responseMessage?.status! > 201}
            value={value}
            onValueChange={setValue}
            errorMessage={
              !validEmail
                ? "Please enter a valid email"
                : responseMessage?.status! > 201
                ? responseMessage!.message
                : ""
            }
            endContent={
              <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
          />
        </div>
        <Button
          onClick={handleSubmit}
          isLoading={loading}
          disabled={loading}
          radius="full"
          className="mt-5"
          size="md"
        >
          {loading
            ? ""
            : responseMessage?.status === 201
            ? responseMessage.message
            : "Subscribe"}
        </Button>
      </div>
    </div>
  );
};

export default NewsletterForm;
