import { Suspense } from "react";
import { Chip, Skeleton, User, Code, Link, Snippet } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const data = await fetch(`${process.env.VERCEL_URL}/api/posts`).then((res) =>
    res.json()
  );

  return data.posts.map((post: { slug: string }) => {
    slug: post.slug;
  });
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const res = await fetch(`${process.env.VERCEL_URL}/api/posts/${params.slug}`);
  const data = await res.json();
  let title = "Pclyst";
  let description = "Post not found. 404 error.";
  let ogImageUrl = "https://media.graphassets.com/E0UoOkHpTuuZjJ3qsFOl";

  if (data.post) {
    title = data.post.seoOverride.title;
    description = data.post.seoOverride.description;
    ogImageUrl = data.post.seoOverride.image.url;
  }

  return {
    metadataBase: new URL(`${process.env.VERCEL_URL}`),
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${process.env.VERCEL_URL}/${params.slug}`,
      siteName: "Pclyst",
      images: [
        {
          url: ogImageUrl,
        },
      ],
    },
  };
}

const SinglePost = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const category = "Gaming";
  const res = await fetch(`${process.env.VERCEL_URL}/api/posts/${slug}`);
  const data = await res.json();

  if (!data.post) {
    notFound();
  }
  const { title, date, coverImage, content, author } = data.post;

  return (
    <main>
      <section>
        <div className="mx-auto px-5 md:px-0 w-full md:w-10/12 lg:w-6/12">
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
                    <Link href={author.twitterProfileLink}>
                      {author.twitterName}
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
                alt={coverImage.altText ? coverImage.altText : "Featured Image"}
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
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside">{children}</ol>
                ),
                img: ({ src, altText, width, height }) => (
                  <div className="flex justify-center">
                    <Image
                      src={src!}
                      alt={altText!}
                      width={width}
                      height={height}
                      className="max-w-72"
                    />
                  </div>
                ),
              }}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default SinglePost;
