import React from "react";
import hygraph from "@/app/lib/hygraph";
import { notFound } from "next/navigation";
import { Post } from "@/app/types";
import BreadCrumbs from "@/app/components/BreadCrumbs";
import PostCard from "@/app/components/PostCard";
import AdvertisementBanner from "@/app/components/AdvertisementBanner";

const CategoryWisePosts = async ({
  params,
}: {
  params: { category: string };
}) => {
  const { posts }: { posts: Post[] } = await hygraph.request(
    `
    {
      posts(where: {category: "${params.category}"}) {
        title
        slug
        author {
          picture {
            url
          }
          name
          twitterName
          twitterProfileLink
        }
        coverImage {
          url
          altText
        }
        category
        date
      }
    }
    `
  );

  if (posts.length == 0) {
    notFound();
  }

  return (
    <main className="container mx-auto px-5">
      {/* Page Header Section */}
      <section>
        <div className="py-4 text-center">
          <h1 className="text-3xl">All Posts</h1>
          <div className="flex items-center justify-center mt-2">
            <BreadCrumbs
              items={[
                { href: "/", name: "Home" },
                { href: "/posts", name: "Posts" },
                { href: `/posts/${params.category}`, name: params.category },
              ]}
            />
          </div>
        </div>
      </section>

      {/* PostCards List*/}
      <section className="my-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* Advertisement Banner*/}
      <section className="mb-24">
        <AdvertisementBanner />
      </section>
    </main>
  );
};

export default CategoryWisePosts;
