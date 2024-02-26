import { ApolloServer } from "@apollo/server";
import { User } from "./user";
import { Posts } from "./posts";

interface MyContext {
  token?: String;
}

export const gqlServer = async () => {
  const server = new ApolloServer<MyContext>({
    typeDefs: `#graphql
            ${User.typeDefs} 
            ${Posts.typeDefs}

            type Query {
                 ${User.queries}
                 ${Posts.queries}
            }          
            type Mutation {
                ${User.mutations}
                ${Posts.mutations}
            }
    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
        ...Posts.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
        ...Posts.resolvers.mutations,
      },
    },
    includeStacktraceInErrorResponses: false,
    introspection: true,
  });

  await server.start();

  return server;
};
