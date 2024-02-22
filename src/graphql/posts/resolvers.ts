import { CreatePostPayload } from "../../services/posts";

const queries = {};

const mutations = {
  createPost: async (
    _: any,
    { title, slug, body, author, authorId }: CreatePostPayload
  ) => {},
};

export const resolvers = { queries, mutations };
