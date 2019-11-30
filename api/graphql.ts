import { ApolloServer } from "apollo-server-micro";
import { getConnection } from "../src/database";
import typeDefs from "../src/graphql/schema";
import resolvers from "../src/graphql/resolvers";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
  context: async () => {
    const dbConn = await getConnection();
    return { dbConn };
  }
});

export default apolloServer.createHandler({ path: "/api/graphql" });
