import { Prisma } from "@prisma/client";
import UserService from "./users";
import { prismaClient } from "../lib/db";

export interface CreatePostPayload {
  slug: string;
  title: string;
  body: string;
  authorId: string;
}

class PostService {
  public static createPost = async (payload: CreatePostPayload) => {
    const { slug, title, body, authorId } = payload;
    // const checkUser = UserService.
    const post = await prismaClient.post.create({
      data: {
        slug,
        title,
        body,
        authorId,
      },
    });
  };
}

export default PostService;
