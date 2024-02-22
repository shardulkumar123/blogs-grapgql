"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const users_1 = __importDefault(require("../../services/users"));
const queries = {
    getUsers: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield users_1.default.getUser();
    }),
    getLoginToken: (_, { email, password }) => __awaiter(void 0, void 0, void 0, function* () {
        const createLogin = yield users_1.default.createUserLoginToken({
            email,
            password,
        });
        return createLogin;
    }),
    // getCurrentLoginUser: async (_: any, parameters: any, context: any) => {
    //   console.log("context", context);
    //   return context.user;
    // },
};
const mutations = {
    createUser: (_, { firstName, lastName, email, password }) => __awaiter(void 0, void 0, void 0, function* () {
        const createUser = yield users_1.default.createUser({
            firstName,
            lastName,
            email,
            password,
        });
        console.log("createUser", createUser);
        return createUser.id;
    }),
    // createLoginToken: async (_: any, { email, password }: CreateUserPayload) => {
    //   const createLogin = await UserService.createUserLoginToken({
    //     email,
    //     password,
    //   });
    //   return createLogin;
    // },
};
exports.resolvers = { queries, mutations };
