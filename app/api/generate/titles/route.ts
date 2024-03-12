import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { GraphQLClient } from "graphql-request";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

const hygraph = new GraphQLClient(`${process.env.HYGRAPH_ENDPOINT}`, {
  fetch,
});

export const runtime = "edge";

interface RssLink {
  link: string;
}

export async function POST(req: NextRequest) {
  try {
    // Getting the rss feed links of different sites. Example:- https://techblogofyourchoice.com/rss.xml
    const { rsslinks }: { rsslinks: RssLink[] } = await hygraph.request(
      `
        {
            rsslinks {
              link
            }
        }
        `,
      {
        fetch,
      }
    );

    // Map over rsslinks and return an array of promises
    const promises = rsslinks.map((o) => fetchAndProcessFeed(o.link));

    // Wait for all promises to resolve
    await Promise.all(promises);

    return NextResponse.json({
      status: 201,
      message: "Titles Created Successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "Error Occured" });
  }
}

async function fetchAndProcessFeed(link: string) {
  try {
    const res = await fetch(link);
    const data = await res.text();
    const $ = cheerio.load(data, { xmlMode: true });
    let tag = $("entry").length > 0 ? "entry" : "item";
    let publishedDate = $("published").length > 0 ? "published" : "pubDate";
    let elements = $(tag).get();

    for (let element of elements) {
      const givenDate = new Date($(element).find(publishedDate).text());
      let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

      if (givenDate.getUTCDate() == yesterday.getUTCDate()) {
        let elementTitle = $(element).find("title").text();
        let filteredTitle = elementTitle.replace("- CNET", "").trim();
        const existingTitle = await prisma.postTitles.findUnique({
          where: {
            title: filteredTitle,
          },
          cacheStrategy: { ttl: 60 * 60 * 24 },
        });

        if (!existingTitle) {
          await prisma.postTitles.create({
            data: { title: filteredTitle },
          });
        }
      }
    }

    return NextResponse.json({ status: 200, message: "Titles Generated" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "Error Occured" });
  }
}
