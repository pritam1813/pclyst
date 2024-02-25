import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <main className="container mx-auto my-10 px-4">
      <div className="flex flex-col items-center">
        <div className="text-[8rem] md:text-[12rem]">404</div>
        <div className="text-2xl font-bold mb-4">Page not found</div>
        <div className="mb-4">
          Oops! The page you are looking for does not exist. It might have been
          moved or deleted.
        </div>
        <Button href="/" as={Link} variant="bordered">
          Back to Home
        </Button>
      </div>
    </main>
  );
};

export default NotFound;
