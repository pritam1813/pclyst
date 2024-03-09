import hygraph from "@/app/lib/hygraph";
import { GraphQLClient } from "graphql-request";
import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

interface RssLink {
  link: string;
}

const mutation = new GraphQLClient(`${process.env.HYGRAPH_ENDPOINT}`, {
  headers: {
    authorization: `Bearer ${process.env.CREATE_TITLES}`,
  },
});

export async function POST(req: NextRequest) {
  try {
    // For calculating Request duration
    console.time("POST Request Time");

    // Getting the rss feed links of different sites. Example:- https://techblogofyourchoice.com/rss.xml
    const { rsslinks }: { rsslinks: RssLink[] } = await hygraph.request(
      `
        {
            rsslinks {
              link
            }
        }
        `
    );

    /* 
        Fetching each of the rss feed and parsing it with cheerio. 
        Then finding the published date of the article and comparing it with yesterday's date. 
        If the article was published yesterday, then we create a new title. 
        If the title already exists, we do nothing. If the article was not published yesterday, we do nothing.
    */

    for (let o of rsslinks) {
      fetch(o.link)
        .then((res) => res.text())
        .then((data) =>
          cheerio.load(data, {
            xmlMode: true,
          })
        )
        .then(async ($) => {
          // different feeds have different naming convention of tags and date.
          let tag = $("entry").length > 0 ? "entry" : "item";
          let publishedDate =
            $("published").length > 0 ? "published" : "pubDate";
          let elements = $(tag).get();

          for (let element of elements) {
            const givenDate = new Date($(element).find(publishedDate).text());
            let yesterday = new Date(
              new Date().setDate(new Date().getDate() - 1)
            );

            if (givenDate.getUTCDate() == yesterday.getUTCDate()) {
              let elementTitle = $(element).find("title").text();
              let filteredTitle = elementTitle.replace("- CNET", "").trim();
              let { title }: { title: { id: string } } = await hygraph.request(
                `
                {
                    title(where: {title: "${filteredTitle}"}) {
                      id
                    }
                }
                `
              );

              if (title === null) {
                await mutation.request(
                  `
                    mutation CreateTitle($title: String!) {
                        createTitle(
                            data: {title: $title}
                        ) {
                            id
                        }
                        publishTitle(
                            where: {title: $title}
                        ) {
                            id
                        }
                    }
                    `,
                  { title: filteredTitle }
                );
              }
            }
          }
        });
    }

    console.timeEnd("POST Request Time");
    return NextResponse.json({
      status: 201,
      message: "Titles Created Successfully",
    });
  } catch (error) {
    console.log(error);
  }
}
