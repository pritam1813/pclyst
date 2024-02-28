import { GraphQLClient } from "graphql-request";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const hygraph = new GraphQLClient(`${process.env.HYGRAPH_ENDPOINT}`, {
    headers: {
      authorization: `Bearer ${process.env.NEWSLETTER_API_TOKEN}`,
    },
  });

  try {
    const result = await req.json();
    const {
      createNewsletterSubscriber,
    }: { createNewsletterSubscriber: { email: string } } =
      await hygraph.request(
        `
        mutation CreateNewsletterSubscriber($email: String!) {
          createNewsletterSubscriber(data: {email: $email}) {
            email
          }
        }
      `,
        { email: result.email }
      );

    return NextResponse.json({
      createNewsletterSubscriber,
      message: "Successfully Subscribed",
      status: 201,
    });
  } catch (error: any) {
    //console.log(error);
    let message = error.response.errors[0].message;
    if (message.includes("not unique")) {
      return NextResponse.json({
        message: "Email already exists",
        status: 400,
      });
    } else {
      return NextResponse.json({
        message: "Something went wrong. Please try again",
        status: 500,
      });
    }
  }
}
