import React from "react";
import BreadCrumbs from "../components/BreadCrumbs";
import { Button, Card, CardBody, Chip, User } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import PostCard from "../components/PostCard";
import AdvertisementBanner from "../components/AdvertisementBanner";
import hygraph from "../lib/hygraph";
import { Post } from "../page";

const Posts = async () => {
  const { posts }: { posts: Post[] } = await hygraph.request(
    `
        {
          posts(orderBy: createdAt_DESC) {
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
    <main>
      <div className="container mx-auto px-5">
        {/* Page Header Section */}
        <section>
          <div className="py-4 text-center">
            <h1 className="text-3xl">All Posts</h1>
            <div className="flex items-center justify-center mt-2">
              <BreadCrumbs
                items={[
                  { href: "/", name: "Home" },
                  { href: "/posts", name: "Posts" },
                ]}
              />
            </div>
          </div>
        </section>

        {/* Post Page Banner*/}
        <section className="my-12">
          <Card className="relative">
            <figure>
              <Image
                src={posts[0].coverImage.url}
                alt={posts[0].coverImage.altText}
                width={1216}
                height={450}
                className="w-full"
              />
            </figure>
            <CardBody className="p-2 md:p-10 absolute bottom-0 w-full md:w-8/12 z-20 text-zinc-400">
              <Chip color="primary" className="mb-2 md:mb-4">
                {posts[0].category}
              </Chip>

              <Link
                href="#"
                className="text-xl md:text-2xl lg:text-4xl text-zinc-300 hover:text-white transition-transform duration-500 hover:-translate-y-1 hover:underline"
              >
                {posts[0].title}
              </Link>

              {/* <div className="relative inline-block group text-4xl">
                <span className="absolute inline-block overflow-hidden whitespace-normal text-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left pb-0.5">
                  <Link href="#">
                    The Impact of Technology on the Workplace: How Technology is
                    Changing
                  </Link>
                </span>
                <Link href="#">
                  The Impact of Technology on the Workplace: How Technology is
                  Changing
                </Link>
              </div> */}

              <div className="mt-3 md:mt-6 flex items-center gap-5 ">
                <div className=" flex items-center gap-3">
                  <div className="avatar text-white">
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
                <p className="text-white text-xs md:text-base">
                  {new Date(posts[0].date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </CardBody>

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
          </Card>
        </section>

        {/* PostCards List*/}
        <section className="my-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
          <div className="flex items-center justify-center w-full mt-8">
            <Button variant="bordered">Load More</Button>
          </div>
        </section>

        {/* Advertisement Banner*/}
        <section className="mb-24">
          <AdvertisementBanner />
        </section>
      </div>
    </main>
  );
};

export default Posts;
