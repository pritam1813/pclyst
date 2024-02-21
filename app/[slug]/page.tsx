import { Suspense } from "react";
import { Chip, Skeleton, User } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SinglePost = async ({ params }: { params: { slug: string } }) => {
  const category = "Gaming";
  const res = await fetch(`http://localhost:3000/api/posts/${params.slug}`);
  const data = await res.json();
  const { title, date, coverImage } = data.post;

  return (
    <main>
      <section>
        <div className="mx-auto px-5 md:px-0 w-full md:w-10/12 lg:w-5/12">
          {/* Page Header */}
          <div className="py-5">
            <Chip color="primary" className="mb-2 md:mb-4">
              {category}
            </Chip>
            <h1 className=" font-semibold text-xl md:text-2xl lg:text-4xl leading-5 md:leading-10 ">
              {title}
            </h1>

            <div className="mt-3 md:mt-6 flex items-center gap-5">
              <div className="flex items-center gap-3">
                <User
                  name="Junior Garcia"
                  description={
                    <Link href="https://twitter.com/jrgarciadev">
                      @jrgarciadev
                    </Link>
                  }
                  avatarProps={{
                    src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                  }}
                />
              </div>
              <p className="text-xs md:text-sm">{date}</p>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mt-8">
            <Suspense
              fallback={
                <Skeleton className="rounded-lg">
                  <div className="w-[800px] h-[462px] rounded-lg bg-default-300"></div>
                </Skeleton>
              }
            >
              <Image
                src={coverImage.url}
                alt="Featured Image of the post"
                width={800}
                height={462}
                priority
                className="w-full h-full"
              />
            </Suspense>
          </div>

          {/* Post Content */}
          <div className="my-8">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export const dynamicParams = false;
export default SinglePost;
