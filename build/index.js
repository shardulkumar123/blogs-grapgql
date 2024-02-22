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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const express4_1 = require("@apollo/server/express4");
const graphql_1 = require("./src/graphql");
const init_app = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    const Port = Number(process.env.PORT) || 8001;
    app.use("/graphql", (0, cors_1.default)(), body_parser_1.default.json(), (0, express4_1.expressMiddleware)(yield (0, graphql_1.gqlServer)(), {
    // context: async ({ req }) => {
    //   const token = req.headers["token"];
    //   console.log("token", token);
    //   try {
    //     const user = await UserService.verifyUserToken(token as string);
    //     return user;
    //   } catch (error) {
    //     throw new Error("Something went wrong due to this error: " + error);
    //   }
    // },
    }));
    app.get("/", (req, res) => {
        res.status(200).send({ message: "Server is up and running!" });
    });
    app.listen(Port, () => console.log(`Server is running on Port: ${Port}`));
});
init_app();
