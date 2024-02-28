import hygraph from "@/app/lib/hygraph";
import { NextRequest, NextResponse } from "next/server";
import { Post } from "@/app/types";

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
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
                seoOverride {
                  description
                  image {
                    url
                  }
                  title
                }
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
