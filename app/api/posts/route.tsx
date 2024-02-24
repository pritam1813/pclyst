import hygraph from "@/app/lib/hygraph";
import { NextRequest, NextResponse } from "next/server";

interface Post {
  title: string;
}

export async function POST(req: NextRequest) {
  try {
    const offset = req.nextUrl.searchParams.get("offset");
    const limit = req.nextUrl.searchParams.get("limit");

    const { posts }: { posts: Post[] } = await hygraph.request(
      `
            {
                posts(skip: ${offset}, orderBy: createdAt_DESC, first: ${limit}) {
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

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
