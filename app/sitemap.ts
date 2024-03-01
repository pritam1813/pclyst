import { MetadataRoute } from "next";
import hygraph from "@/app/lib/hygraph";

interface SiteMapProps {
  slug: string;
  updatedAt: string;
}

const generateSitemapObjects = async () => {
  const { posts, pages }: { posts: SiteMapProps[]; pages: SiteMapProps[] } =
    await hygraph.request(
      `{
          pages(orderBy: createdAt_DESC) {
            slug
            updatedAt
          }
          posts(orderBy: createdAt_DESC) {
            slug
            updatedAt
          }
        }`
    );

  return { posts, pages };
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `${process.env.BASE_URL}`,
    },
    {
      url: `${process.env.BASE_URL}/posts`,
      changeFrequency: "weekly",
    },
    ...(await generateSitemapObjects()).posts.map((post) => ({
      url: `${process.env.BASE_URL}/posts/${post.slug}`,
      lastmod: post.updatedAt,
    })),
    ...(await generateSitemapObjects()).pages.map((page) => ({
      url: `${process.env.BASE_URL}/${page.slug}`,
      lastmod: page.updatedAt,
    })),
  ];
}
