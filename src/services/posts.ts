import UserService from "./users";

export interface CreatePostPayload {
  slug: string;
  title: string;
  body: string;
  author: any;
  authorId: string;
}

class PostService {
  createPost = async (payload: CreatePostPayload) => {
    const { slug, title, body, author, authorId } = payload;
    // const post = 
  };
}

export default PostService;
