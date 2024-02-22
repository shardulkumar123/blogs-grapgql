import { Prisma } from "@prisma/client";
import UserService from "./users";
import { prismaClient } from "../lib/db";

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
    return await prismaClient.post.create({
      data: {
        slug,
        title,
        body,
        author,
        authorId,
      },
    });
  };
}

export default PostService;
