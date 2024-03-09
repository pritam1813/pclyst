import { Link } from "@nextui-org/react";
import React from "react";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { notFound } from "next/navigation";
import hygraph from "@/app/lib/hygraph";
import { Page, PageSlug, PageMetaData } from "@/app/types";

const cache: {
  [key: string]: any;
} = {};

export async function generateStaticParams() {
  if (cache["pages"]) {
    return cache["pages"];
  }

  const { pages }: { pages: PageSlug[] } = await hygraph.request(
    `
    {
      pages {
        slug
      }
    }
    `
  );

  // Store the data in the cache
  cache["pages"] = pages.map((page) => ({
    slug: page.slug,
  }));

  return cache["pages"];
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  if (cache[params.slug]) {
    return cache[params.slug];
  }

  const { page }: { page: PageMetaData } = await hygraph.request(
    `
    {
      page(where: {slug: "${params.slug}"}) {
        title
        subtitle
      }
    }
    `
  );
  let title = "Pclyst";
  let description = "Page not found. 404 error.";

  if (page) {
    title = page.title;
    description = page.subtitle;
  }

  cache[params.slug] = {
    metadataBase: new URL(`${process.env.BASE_URL}`),
    title,
    description,
    openGraph: {
      title: `${title} | Pclyst`,
      description,
      url: `${process.env.BASE_URL}/${params.slug}`,
      siteName: "Pclyst",
      images: [
        {
          url: "/opengraph-image.png",
        },
      ],
    },
    twitter: {
      images: {
        url: "/twitter-image.png",
        alt: `${title}`,
      },
    },
  };

  return cache[params.slug];
}

const SinglePage = async ({ params }: { params: { slug: string } }) => {
  let pageContent = null;
  if (cache[`page/${params.slug}`]) {
    pageContent = cache[`page/${params.slug}`];
  } else {
    const { page }: { page: Page } = await hygraph.request(
      `{
        page(where: {slug: "${params.slug}"}) {
          content {
            raw
          }
          title
        }
      }`
    );
    cache[`page/${params.slug}`] = page;
    pageContent = cache[`page/${params.slug}`];
  }

  if (!pageContent || pageContent === undefined) {
    notFound();
  }
  const { title, content } = pageContent;

  return (
    <main className="container mx-auto px-5">
      {/* Page Header Section */}
      <section>
        <div className="py-4 text-center">
          <h1 className="text-3xl mb-5">{title}</h1>
        </div>
      </section>

      <section>
        <RichText
          content={content.raw}
          renderers={{
            p: ({ children }) => (
              <p className="text-xl leading-8 my-4">{children}</p>
            ),
            h2: ({ children }) => (
              <h2 className="text-2xl leading-7 font-semibold mt-8 mb-4">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xl leading-7 font-semibold mt-8 mb-4">
                {children}
              </h3>
            ),
            a: ({ children, href, openInNewTab }) => (
              <Link
                showAnchorIcon={openInNewTab}
                href={href}
                isExternal={openInNewTab}
              >
                {children}
              </Link>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside">{children}</ul>
            ),
          }}
        />
      </section>
    </main>
  );
};

export default SinglePage;
