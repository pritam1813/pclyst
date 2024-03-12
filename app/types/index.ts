interface Image {
  url: string;
  altText?: string;
}

interface Author {
  name: string;
  twitterName: string;
  twitterProfile: string;
  twitterProfileLink: string;
  picture: Image;
}

interface Content {
  json: any;
  raw?: any;
}

export interface Post {
  slug: string;
  coverImage: Image;
  date: string;
  title: string;
  content: Content;
  author: Author;
  category: string;
}

export interface BannerImage {
  coverImageTransformed: Image;
}

export interface HomePagePosts extends Post {
  posts: Post[];
  bannerImage: BannerImage[];
}

interface SeoOverride {
  title: string;
  description: string;
  image: Image;
}

export interface PostSeo {
  seoOverride: SeoOverride;
}

export interface Page extends Post {
  content: Content;
}

export interface PageSlug {
  slug: string;
}

export interface PageMetaData {
  title: string;
  subtitle: string;
}
