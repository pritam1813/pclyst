export interface Post {
  slug: string;
  coverImage: {
    url: string;
    altText: string;
  };
  date: string;
  title: string;
  content: { json: any };
  author: {
    name: string;
    twitterName: string;
    twitterProfile: string;
    twitterProfileLink: string;
    picture: { url: string };
  };
  category: string;
}

export interface PostSeo {
  seoOverride: {
    title: string;
    description: string;
    image: { url: string };
  };
}

export interface Page {
  title: string;
  content: { raw: any };
}

export interface PageSlug {
  slug: string;
}

export interface PageMetaData {
  title: string;
  subtitle: string;
}
