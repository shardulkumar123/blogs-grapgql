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
    console.log("post", post);
    return "post created";
  },
};

export const resolvers = { queries, mutations };
