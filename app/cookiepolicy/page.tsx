import React from "react";
import { Page } from "../types";
import hygraph from "../lib/hygraph";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { Link } from "@nextui-org/react";

const CookiePolicy = async () => {
  const { page }: { page: Page } = await hygraph.request(
    `
            {
              page(where: {slug: "cookiepolicy"}) {
                content {
                  raw
                }
              }
            }
            `
  );

  const { content } = page;
  return (
    <main className="container mx-auto px-5">
      {/* Page Header Section */}
      <section>
        <div className="py-4 text-center">
          <h1 className="text-3xl mb-5">Cookie Policy</h1>
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

export default CookiePolicy;
