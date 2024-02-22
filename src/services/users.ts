import { prismaClient } from "../lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface CreateUserPayload {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface CreateUserLoginToken {
  email: string;
  password: string;
}

class UserService {
  private static findUserByEmail = (email: string) => {
    return prismaClient.user.findUnique({
      where: {
        email,
      },
    });
  };

  public static createUser = async (payload: CreateUserPayload) => {
    const { firstName, lastName, email, password } = payload;
    try {
      const hashPassowrd = await bcrypt.hash(password, 10);
      const checkUser = await UserService.findUserByEmail(email);

      if (checkUser) throw Error("user already exits");

      return prismaClient.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashPassowrd,
        },
      });
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  public static createUserLoginToken = async (
    payload: CreateUserLoginToken
  ) => {
    const { email, password } = payload;
    const checkUser = await UserService.findUserByEmail(email);

    if (!checkUser)
      throw new Error("email not exits. please create you account.");

    const decryptUserPassword = await bcrypt.compare(
      password,
      checkUser.password
    );

    if (!decryptUserPassword) throw new Error("Invalid Credentials");

    return jwt.sign(payload, `${process.env.JWT_SECRET}`);
  };

  public static verifyUserToken = async (token: string) => {
    return jwt.verify(token, `${process.env.JWT_SECRET}`);
  };

  public static getUser = () => {
    return prismaClient.user.findMany({});
  };

  public static getCurrentLoginUser = async () => {
    console.log("test");
    return {};
    //   prismaClient.user.findUnique({
    //     where: {
    //       email: context.email,
    //     },
    //   });
  };
}

export default UserService;
