import UserService, { CreateUserPayload } from "../../services/users";

const queries = {
  getUsers: async () => {
    return await UserService.getUser();
  },
  getLoginToken: async (_: any, { email, password }: CreateUserPayload) => {
    const createLogin = await UserService.createUserLoginToken({
      email,
      password,
    });
    return createLogin;
  },
  getCurrentLoginUser: async () => {
    // console.log("context", context);
    // return {};
    throw new Error("error from resolvers to get current login user");
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
    console.log("createUser", createUser);
    return createUser.id;
  },

  // createLoginToken: async (_: any, { email, password }: CreateUserPayload) => {
  //   const createLogin = await UserService.createUserLoginToken({
  //     email,
  //     password,
  //   });
  //   return createLogin;
  // },
};

export const resolvers = { queries, mutations };
