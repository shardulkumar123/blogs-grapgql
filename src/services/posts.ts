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
    return await prismaClient.post.create({
      data: {
        slug,
        title,
        body,
        authorId,
      },
    });
  };

  public static getAllPost = async () => {
    return prismaClient.post.findMany();
  };

  public static getPostByUser = async (authorId: string) => {
    return prismaClient.post.findMany({
      where: {
        authorId,
      },
    });
  };
}

export default PostService;
