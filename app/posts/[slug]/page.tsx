import { Suspense } from "react";
import { Chip, Skeleton, User, Code, Link, Snippet } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { notFound } from "next/navigation";
import hygraph from "@/app/lib/hygraph";
import { Post, PostSeo } from "@/app/types";

interface PostSlug {
  slug: string;
}

const cache: {
  [key: string]: any;
} = {};

export async function generateStaticParams() {
  if (cache["posts"]) {
    return cache["posts"];
  }
  const { posts }: { posts: PostSlug[] } = await hygraph.request(
    `{
      posts(orderBy: createdAt_DESC) {
        slug
      }
    }`
  );

  cache["posts"] = posts.map((post) => ({
    slug: post.slug,
  }));

  return cache["posts"];
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  try {
    if (cache[params.slug]) {
      return cache[params.slug];
    }

    const { post }: { post: PostSeo } = await hygraph.request(
      `
      {
        post(where: {slug: "${params.slug}"}) {
          seoOverride {
            description
            image {
              url
            }
            title
          }
        }
      }
      `
    );
    let title = "Pclyst";
    let description = "Post not found. 404 error.";
    let ogImageUrl = "media.graphassets.com/ZqUATlcgTCyLQCWQN21n";

    if (post) {
      title = post.seoOverride.title;
      description = post.seoOverride.description;
      ogImageUrl = post.seoOverride.image.url;
    }

    cache[params.slug] = {
      metadataBase: new URL(`${process.env.BASE_URL}`),
      title,
      description,
      openGraph: {
        title,
        description,
        url: `${process.env.BASE_URL}/${params.slug}`,
        siteName: "Pclyst",
        images: [
          {
            url: ogImageUrl,
          },
        ],
      },
    };

    return cache[params.slug];
  } catch (error) {
    console.log(error);
  }
}

const SinglePost = async ({ params }: { params: { slug: string } }) => {
  const { post }: { post: Post } = await hygraph.request(
    `
          {
            post(where: {slug: "${params.slug}"}) {
              author {
                name
                twitterName
                twitterProfileLink
                picture {
                  url
                }
              }
              category
              content {
                json
              }
              coverImage {
                altText
                url
              }
              date
              title
            }
          }
          `
  );
  if (!post || post === undefined) {
    notFound();
  }
  const { title, date, coverImage, content, author, category } = post;

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
                {author == null ? (
                  <User
                    name="Pritam Dhara"
                    description={
                      <Link href="https://twitter.com/pritam1813">
                        @pritam1813
                      </Link>
                    }
                    avatarProps={{
                      src: "https://media.graphassets.com/hhtFCOr7S6CZc7MiEH0n",
                    }}
                  />
                ) : (
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
                )}
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
                img: ({ src, width, height, title }) => (
                  <div className="flex justify-center">
                    <Image
                      src={src!}
                      alt={title!}
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

export const dynamic = "force-dynamic";
export default SinglePost;
