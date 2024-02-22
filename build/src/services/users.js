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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../lib/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
}
_a = UserService;
UserService.findUserByEmail = (email) => {
    return db_1.prismaClient.user.findUnique({
        where: {
            email,
        },
    });
};
UserService.createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = payload;
    try {
        const hashPassowrd = yield bcrypt_1.default.hash(password, 10);
        const checkUser = yield _a.findUserByEmail(email);
        if (checkUser)
            throw Error("user already exits");
        return db_1.prismaClient.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashPassowrd,
            },
        });
    }
    catch (error) {
        throw new Error(`${error}`);
    }
});
UserService.createUserLoginToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const checkUser = yield _a.findUserByEmail(email);
    if (!checkUser)
        throw new Error("email not exits. please create you account.");
    const decryptUserPassword = yield bcrypt_1.default.compare(password, checkUser.password);
    if (!decryptUserPassword)
        throw new Error("Invalid Credentials");
    return jsonwebtoken_1.default.sign(payload, `${process.env.JWT_SECRET}`, {
        expiresIn: "7d",
    });
});
UserService.verifyUserToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.verify(token, `${process.env.JWT_SECRET}`);
});
UserService.getUser = () => {
    return db_1.prismaClient.user.findMany({});
};
exports.default = UserService;
