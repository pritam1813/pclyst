import { GraphQLClient } from "graphql-request";
const hygraph = new GraphQLClient(`${process.env.HYGRAPH_ENDPOINT}`, {
  next: { revalidate: 86400 },
});
export default hygraph;
