import UserService, { CreateUserPayload } from "../../services/users";

const queries = {
  getUsers: async () => {
    return await UserService.getUsers();
  },
  getCurrentLoginUser: async (_: any, paramenter: any, context: any) => {
    try {
      const getUser = await UserService.getCurrentLoginUser(context.email);
      console.log("getUser", getUser);
      return getUser;
    } catch (error) {
      throw new Error("error from resolvers to get current login user");
    }
  },
};

const mutations = {
  createUser: async (
    _: any,
    { firstName, lastName, email, password }: CreateUserPayload
  ) => {
    const createUser = await UserService.createUser({
      firstName,
      lastName,
      email,
      password,
    });
    return createUser.id;
  },

  createLoginToken: async (_: any, { email, password }: CreateUserPayload) => {
    const createLogin = await UserService.createUserLoginToken({
      email,
      password,
    });
    return createLogin;
  },
};

export const resolvers = { queries, mutations };
