import { GraphQLClient } from "graphql-request";
const hygraph = new GraphQLClient(`${process.env.HYGRAPH_ENDPOINT}`);
export default hygraph;
