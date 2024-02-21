import { Suspense } from "react";
import { Chip, Skeleton, User, Code, Link, Snippet } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { notFound } from "next/navigation";

const SinglePost = async ({ params }: { params: { slug: string } }) => {
  const category = "Gaming";
  const res = await fetch(`http://localhost:3000/api/posts/${params.slug}`);
  const data = await res.json();

  if (!data.post) {
    notFound();
  }
  const { title, date, coverImage, content, author } = data.post;

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

            <div className="mt-3 md:mt-6 flex justify-between items-center gap-5">
              <div className="flex items-center gap-3">
                <User
                  name={author.name}
                  description={
                    <Link href="https://twitter.com/jrgarciadev">
                      @jrgarciadev
                    </Link>
                  }
                  avatarProps={{
                    src: author.picture.url,
                  }}
                />
              </div>
              <p className="text-xs md:text-sm">
                {new Date(date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
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
            <RichText
              content={content.json}
              renderers={{
                p: ({ children }) => (
                  <p className="text-xl leading-8 my-4">{children}</p>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl leading-7 font-semibold mt-8 mb-4">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl leading-7 font-semibold mt-8 mb-4">
                    {children}
                  </h3>
                ),
                code_block: ({ children }) => (
                  <Snippet size="md" className="my-4">
                    {children}
                  </Snippet>
                ),
                a: ({ children, href, openInNewTab }) => (
                  <Link
                    showAnchorIcon={openInNewTab}
                    href={href}
                    isExternal={openInNewTab}
                  >
                    {children}
                  </Link>
                ),
                code: ({ children }) => <Code size="md">{children}</Code>,
                ul: ({ children }) => (
                  <ul className="list-disc list-inside">{children}</ul>
                ),
              }}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export const dynamicParams = false;
export default SinglePost;
