import React from "react";
import { Card, CardBody, CardFooter, Chip, User } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

interface Post {
  slug: string;
  coverImage: {
    url: string;
    altText: string;
  };
  date: string;
  title: string;
  author: {
    name: string;
    social: {
      name: string;
      url: string;
    };
    picture: {
      url: string;
    };
  };
  category: string;
}

const PostCard = ({ post }: { post: Post }) => {
  const { title, slug, category, coverImage, date, author } = post;
  return (
    <Card>
      <CardBody>
        <Image
          src={coverImage.url}
          alt={coverImage.altText}
          width={360}
          height={240}
          className="rounded-xl w-full"
        />

        <div className="pt-6 pb-3 px-2">
          <Chip color="primary" className="mb-4">
            {category}
          </Chip>
          <h3>
            <Link
              className="text-base-content hover:text-primary transition-all duration-300 ease-in-out font-semibold text-lg md:text-xl lg:text-2xl mt-2"
              href={`/${slug}`}
            >
              {title}
            </Link>
          </h3>
        </div>
        <CardFooter className="justify-between">
          <User
            name={author.name}
            description={
              <Link href={author.social.url}>{author.social.name}</Link>
            }
            avatarProps={{
              src: author.picture.url,
            }}
          />
          <p className="text-base-content/60 text-xs md:text-base">
            {new Date(date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </CardFooter>
      </CardBody>
    </Card>
  );
};

export default PostCard;
