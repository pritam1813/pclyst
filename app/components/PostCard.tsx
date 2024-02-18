import React from "react";
import { Card, CardBody, CardFooter, Chip, User } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

const PostCard = () => {
  return (
    <Card>
      <CardBody>
        <Image
          src="/pexels-pixabay-38568.jpg"
          alt="Card Image"
          width={360}
          height={240}
          className="rounded-xl w-full"
        />

        <div className="pt-6 pb-3 px-2">
          <Chip color="primary" className="mb-4">
            Technology
          </Chip>
          <h3>
            <a
              className="text-base-content hover:text-primary transition-all duration-300 ease-in-out font-semibold text-lg md:text-xl lg:text-2xl mt-2"
              href="/single-post"
            >
              The Impact of Technology on the Workplace: How Technology is
              Changing
            </a>
          </h3>
        </div>
        <CardFooter className="justify-between">
          <User
            name="Junior Garcia"
            description={
              <Link href="https://twitter.com/jrgarciadev">@jrgarciadev</Link>
            }
            avatarProps={{
              src: "https://avatars.githubusercontent.com/u/30373425?v=4",
            }}
          />
          <p className="text-base-content/60 text-xs md:text-base">
            August 20, 2022
          </p>
        </CardFooter>
      </CardBody>
    </Card>
  );
};

export default PostCard;
