import PostService, { CreatePostPayload } from "../../services/posts";
import UserService from "../../services/users";

const queries = {
  getAllPosts: async () => await PostService.getAllPost(),
  getPostByUser: async (_: any, parameter: any, context: any) => {
    try {
      const findUser = await UserService.findUserByEmail(context.email);
      console.log("findUser", findUser);

      if (findUser) {
        const post = await PostService.getPostByUser(findUser.id);
        return post;
      }
    } catch (error) {
      throw new Error(`Internal server Error due to error: ${error}`);
    }
  },
};

const mutations = {
  createPost: async (
    _: any,
    { title, slug, body }: CreatePostPayload,
    context: any
  ) => {
    try {
      const findUser = await UserService.findUserByEmail(context.email);

      if (findUser) {
        const post = await PostService.createPost({
          title,
          slug,
          body,
          authorId: findUser.id,
        });
        return post.id;
      }
    } catch (error) {
      throw new Error(
        `Internal server Error post not created due to error: ${error}`
      );
    }
  },
};
export const resolvers = { queries, mutations };
