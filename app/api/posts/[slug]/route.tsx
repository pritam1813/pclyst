import { NextRequest, NextResponse } from "next/server";
import { GraphQLClient } from "graphql-request";

const hygraph = new GraphQLClient(`${process.env.HYGRAPH_ENDPOINT}`);

interface Post {
  coverImage: {
    url: string;
  };
  date: string;
  title: string;
  content: {};
  author: {};
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
              altText
            }
            date
            title
            content {
              json
            }
            author {
              name
              twitterName
              twitterProfileLink
              picture {
                url
              }
            }
            seoOverride {
              title
              description
              image {
                url
              }
            }
            category
          }
        }
        `
    );

    return NextResponse.json({ post, status: 200 });
  } catch (error) {
    console.log(error);
  }
}
