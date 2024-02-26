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

export interface Page {
  content: { raw: any };
}
