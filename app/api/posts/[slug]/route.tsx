import { NextRequest, NextResponse } from "next/server";
import { GraphQLClient } from "graphql-request";

const hygraph = new GraphQLClient(`${process.env.HYGRAPH_ENDPOINT}`);

interface Post {
  coverImage: {
    url: string;
  };
  date: string;
  title: string;
}

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { post }: { post: Post } = await hygraph.request(
      `
        {
          post(where: {slug: "${params.slug}"}) {
            coverImage {
              url
            }
            date
            title
          }
        }
        `
    );

    return NextResponse.json({ post, status: 200 });
  } catch (error) {
    console.log(error);
  }
}
