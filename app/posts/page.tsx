"use client";
import React, { useEffect, useState } from "react";
import BreadCrumbs from "../components/BreadCrumbs";
import { Button, Card, CardBody, Chip, User } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import PostCard from "../components/PostCard";
import AdvertisementBanner from "../components/AdvertisementBanner";
import { Post } from "@/app/types/Posts";

const Posts = () => {
  const [fetchedPosts, setFetchedPosts] = useState<Post[]>([]);
  const [offset, setOffset] = useState(0);
  const [loadMoreDisabled, setLoadMoreDisabled] = useState(false);

  const loadMorePosts = async () => {
    const posts: Post[] = await fetch(`/api/posts?offset=${offset}&limit=9`, {
      method: "POST",
    }).then((res) => res.json());

    if (posts.length == 0) {
      setLoadMoreDisabled(true);
    }
    setFetchedPosts([...fetchedPosts, ...posts]);
    setOffset(offset + 9);
  };

  useEffect(() => {
    loadMorePosts();
  }, []);

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
        {fetchedPosts.length > 0 && (
          <section className="my-12">
            <Card className="relative">
              <figure>
                <Image
                  src={fetchedPosts[0].coverImage.url}
                  alt={fetchedPosts[0].coverImage.altText}
                  width={1216}
                  height={450}
                  className="w-full"
                />
              </figure>
              <CardBody className="p-2 md:p-10 absolute bottom-0 w-full md:w-8/12 z-20 text-zinc-400">
                <Chip color="primary" className="mb-2 md:mb-4">
                  {fetchedPosts[0].category}
                </Chip>

                <Link
                  href="#"
                  className="text-xl md:text-2xl lg:text-4xl text-zinc-300 hover:text-white transition-transform duration-500 hover:-translate-y-1 hover:underline"
                >
                  {fetchedPosts[0].title}
                </Link>

                <div className="mt-3 md:mt-6 flex items-center gap-5 ">
                  <div className=" flex items-center gap-3">
                    <div className="avatar text-white">
                      <User
                        name={fetchedPosts[0].author.name}
                        description={
                          <Link
                            href={fetchedPosts[0].author.twitterProfileLink}
                          >
                            {fetchedPosts[0].author.twitterName}
                          </Link>
                        }
                        avatarProps={{
                          src: fetchedPosts[0].author.picture.url,
                        }}
                      />
                    </div>
                  </div>
                  <p className="text-white text-xs md:text-base">
                    {new Date(fetchedPosts[0].date).toLocaleDateString(
                      "en-GB",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>
              </CardBody>

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
            </Card>
          </section>
        )}

        {/* PostCards List*/}
        <section className="my-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {fetchedPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
          <div className="flex items-center justify-center w-full mt-8">
            <Button
              disabled={loadMoreDisabled}
              variant="bordered"
              onClick={loadMorePosts}
            >
              {loadMoreDisabled ? "No more posts" : "Load more"}
            </Button>
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
