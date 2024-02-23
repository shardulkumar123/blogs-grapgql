export const typeDefs = `#graphql
    type Post {
        id: ID!
        title: String!
        slug: String!
        body: String!
        authorId: String!
    }
`;
