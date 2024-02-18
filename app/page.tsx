import Link from "next/link";
import Image from "next/image";
import { Button, Chip, User } from "@nextui-org/react";

import PostCard from "./components/PostCard";

export default function Home() {
  return (
    <main className="container mx-auto">
      {/* Banner Component */}
      <section>
        <div className="relative mb-24 rounded-xl dark:shadow-zinc-800 shadow-lg">
          <Image
            src="/pexels-josh-sorenson-1714208.jpg"
            alt="Main Banner Image"
            width={1216}
            height={600}
            className="rounded-xl w-full"
          />
          <div className="absolute -bottom-16 left-4 md:left-14 rounded-xl p-4 md:p-10  w-10/12 md:w-7/12 lg:w-6/12 shadow-xl bg-zinc-50 dark:bg-zinc-900 dark:shadow-zinc-800 ">
            <Chip color="primary" className="mb-4">
              Technology
            </Chip>
            <h3>
              <a
                className=" font-semibold text-xl md:text-2xl lg:text-4xl leading-5 md:leading-10 group transition-all duration-300 ease-in-out"
                href="/"
              >
                <span className="bg-left-bottom bg-gradient-to-r from-blue-600 to-purple-600 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                  The Impact of Technology on the Workplace: How Technology is
                  Changing
                </span>
              </a>
            </h3>
            <div className="mt-6 flex items-center gap-5">
              <div className=" flex items-center gap-3">
                <div className="avatar">
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
              </div>
              <p className="text-base-content/60 text-xs md:text-base">
                August 20, 2022
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
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item: any) => (
            <PostCard key={item} />
          ))}
        </div>
        <div className="flex items-center justify-center w-full mt-8">
          <Button
            href="/blog"
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
