import PostService, { CreatePostPayload } from "../../services/posts";

const queries = {};

const mutations = {
  createPost: async (
    _: any,
    { title, slug, body, authorId }: CreatePostPayload
  ) => {
    const post = await PostService.createPost({
      title,
      slug,
      body,
      authorId,
    });
  },
};

export const resolvers = { queries, mutations };
