import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import { expressMiddleware } from "@apollo/server/express4";
import { gqlServer } from "./src/graphql";
import UserService from "./src/services/users";

dotenv.config();

const init_app = async () => {
  const app = express();
  const Port = Number(process.env.PORT) || 8001;

  app.use(cors());
  app.use(bodyParser.json());

  app.use(
    "/graphql",
    // cors<cors.CorsRequest>(),
    // bodyParser.json(),

    //Getting problem here with auth
    expressMiddleware(await gqlServer(), {
      context: async ({ req }) => {
        // console.log("req.body", req.body);
        const operationName = req.body.operationName;
        console.log("operationName", operationName);
        try {
          if (
            req.body.operationName === "CreateUser" ||
            req.body.operationName === "CreateLoginToken"
          ) {
            return {};
          }

          const token = req.headers.authorization || "";
          if (!token) {
            throw new Error("Authorization token missing");
          }
          const user = await UserService.verifyUserToken(token as string);
          return user;
        } catch (error) {
          console.error("Error in GraphQL context middleware: ", error);
          throw new Error("Internal server error");
        }
      },
    })
  );

  app.get("/", (req, res) => {
    res.status(200).send({ message: "Server is up and running!" });
  });

  app.listen(Port, () => console.log(`Server is running on Port: ${Port}`));
};

init_app();
