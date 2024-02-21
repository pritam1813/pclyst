import { NextRequest, NextResponse } from "next/server";
import { GraphQLClient } from "graphql-request";

const hygraph = new GraphQLClient(`${process.env.HYGRAPH_ENDPOINT}`);

interface Post {
  slug: string;
  coverImage: {
    url: string;
  };
  date: string;
  title: string;
  author: {};
}

export async function GET(req: NextRequest) {
  try {
    const numOfPosts = req.nextUrl.searchParams.get("limit");

    const { posts }: { posts: Post[] } = await hygraph.request(
      `
          {
            posts(last: ${numOfPosts}, orderBy: createdAt_DESC) {
                slug
                title
                date
                author {
                  name
                  picture {
                    url
                  }
                }
                coverImage {
                  url
                  altText
                }
              }
          }
          `
    );

    return NextResponse.json({ posts, status: 200 });
  } catch (error) {
    console.log(error);
  }
}
