![Nextjsbadge](https://img.shields.io/badge/Next.js-000000.svg?style=for-the-badge&logo=nextdotjs&logoColor=white)
![graphqlbadge](https://img.shields.io/badge/GraphQL-E10098.svg?style=for-the-badge&logo=GraphQL&logoColor=white)
![nextuibadge](https://img.shields.io/badge/NextUI-000000.svg?style=for-the-badge&logo=NextUI&logoColor=white)
![Tailwindcssbadge](https://img.shields.io/badge/Tailwind%20CSS-06B6D4.svg?style=for-the-badge&logo=Tailwind-CSS&logoColor=white)
# PCLYST
Pclyst is a cutting-edge blog that covers everything related to PCs, Games, Smartphones and other cool gadgets. Whether you are looking for honest reviews, in-depth comparisons, breaking news, or expert tips, Pclyst has got you covered. Our team of passionate writers and tech enthusiasts are always on the lookout for the latest trends and innovations in the digital world. Join us and discover the best of technology with Pclyst!

## TECH USED
- [Next JS](https://nextjs.org/)
- [Next UI](https://nextui.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Hygraph CMS](https://hygraph.com/)

## Local Build
To run the project locally or deploy it on vercel, copy the contents of `.env.example` file to `.env` file or `.env.local` file. A hygraph account with a blog project is required. The project should have the following Schema:-

### 1. Post
  - title : (String, Single Line text, unique)
  - slug : (String, Single Line text, unique)
  - date : (Date)
  - exerpt : (String) 
  - coverImage : (Asset, Two way referenced)
  - content : (RichText)
  - author : (Author, Two way reference)
  - seoOverride : (SeoOverride, Basic)
  - category : (String, Single Line text)
### 2. Page
  - title : (String, Single Line text, unique)
  - slug : (String, Single Line text, unique)
  - content : (RichText)
### 3. Newsletter Subscribers
  - email : (String, Single Line text, unique)

> [!NOTE]
> All the schemas mentioned above have respective case sensitive API ID. If any of the field name / type is changed, the respective graphql query / mutation will be needed to be changed as well.

Creating a Permanent auth token as per [Hygraph Documentation](https://hygraph.com/docs/api-reference/basics/permissions#permanent-auth-tokens-with-specific-models) is neccessary to secure the mutation  for the newsletter subscribers schema.

To Start the dev server run
```
pnpm dev
```

## Snaps
![Full Size Homepage Screenshot in dark mode](public/snaps/Full%20Size%20Screenshot%20Dark.png)

![Full Size Homepage Screenshot in Light mode](public/snaps/Full%20Size%20Screenshot%20Light.png)

![Single post page](public/snaps/Single%20Page%20Screenshot.png)

## Deployment

Main deployment - https://pclyst.com
 OR
Deploy yourself

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpritam1813%2Fpclyst&env=HYGRAPH_ENDPOINT,VERCEL_URL,NEWSLETTER_API_TOKEN,MANAGEMENT_ENDPOINT)

## LICENSE
This project is licensed under the [MIT License](LICENSE.md)