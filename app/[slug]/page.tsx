import { Link } from "@nextui-org/react";
import React from "react";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { notFound } from "next/navigation";
import hygraph from "@/app/lib/hygraph";
import { Page, PageSlug, PageMetaData } from "@/app/types";

export async function generateStaticParams() {
  const { pages }: { pages: PageSlug[] } = await hygraph.request(
    `
    {
      pages {
        slug
      }
    }
    `
  );

  return pages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
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
  let description = "Post not found. 404 error.";

  if (page) {
    title = page.title;
    description = page.subtitle;
  }

  return {
    metadataBase: new URL(`${process.env.VERCEL_URL}`),
    title,
    description,
  };
}

const SinglePage = async ({ params }: { params: { slug: string } }) => {
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

  if (!page) {
    notFound();
  }
  const { title, content } = page;

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
