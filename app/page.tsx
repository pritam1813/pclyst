import Link from "next/link";
import Image from "next/image";
import { Button, Chip, User } from "@nextui-org/react";
import hygraph from "./lib/hygraph";
import PostCard from "./components/PostCard";

export interface Post {
  slug: string;
  coverImage: {
    url: string;
    altText: string;
  };
  date: string;
  title: string;
  author: {
    name: string;
    twitterName: string;
    twitterProfile: string;
    twitterProfileLink: string;
    picture: { url: string };
  };
  category: string;
}

export default async function Home() {
  let postsLimit = 6;

  const { posts }: { posts: Post[] } = await hygraph.request(
    `
        {
          posts(first: ${postsLimit}, orderBy: createdAt_DESC) {
              slug
              title
              date
              author {
                name
                twitterName
                twitterProfileLink
                picture {
                  url
                }
              }
              coverImage {
                url
                altText
              }
              category
            }
        }
        `
  );

  return (
    <main className="container mx-auto px-5">
      {/* Banner Component */}
      <section>
        <div className="relative mb-24 rounded-xl dark:shadow-zinc-800 shadow-lg">
          <Image
            src={posts[0].coverImage.url}
            alt={posts[0].coverImage.altText}
            width={1216}
            height={600}
            className="rounded-xl w-full"
            priority
          />
          <div className="absolute -bottom-16 left-4 md:left-14 rounded-xl p-4 md:p-10  w-10/12 md:w-7/12 lg:w-6/12 shadow-xl bg-zinc-50 dark:bg-zinc-900 dark:shadow-zinc-800 ">
            <Chip color="primary" className="mb-4">
              {posts[0].category}
            </Chip>
            <h3>
              <Link
                className="font-semibold text-xl md:text-2xl lg:text-4xl leading-5 md:leading-10 group transition-all duration-300 ease-in-out"
                href={posts[0].slug}
              >
                <span className="bg-left-bottom bg-gradient-to-r from-blue-600 to-purple-600 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                  {posts[0].title}
                </span>
              </Link>
            </h3>
            <div className="mt-6 flex items-center justify-between gap-5">
              <div className=" flex items-center gap-3">
                <div className="avatar">
                  <User
                    name={posts[0].author.name}
                    description={
                      <Link href={posts[0].author.twitterProfileLink}>
                        {posts[0].author.twitterName}
                      </Link>
                    }
                    avatarProps={{
                      src: posts[0].author.picture.url,
                    }}
                  />
                </div>
              </div>
              <p className="text-base-content/60 text-xs md:text-base">
                {new Date(posts[0].date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Advertisement Component */}
      {/* <section className="pt-12"><Advertisement /> </section>*/}

      {/* Latest Post */}
      <section className="my-20">
        <h3 className="text-base-content font-bold text-2xl mb-8 font-work leading-8">
          Latest Posts
        </h3>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post: Post, index: number) => {
            return <PostCard key={index} post={post} />;
          })}
        </div>
        <div className="flex items-center justify-center w-full mt-8">
          <Button
            href="/posts"
            variant="bordered"
            as={Link}
            className="hover:bg-zinc-50 dark:hover:bg-zinc-900"
          >
            View All Post
          </Button>
        </div>
      </section>

      {/* Advertisement Component */}
      <section className="mb-24">{/* <Advertisement /> */}</section>
    </main>
  );
}
