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

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    bodyParser.json(),

    //Getting problem here with auth
    expressMiddleware(await gqlServer(), {
      context: async ({ req }) => {
        const operationName = req.body.operationName;
        try {
          if (!req.headers.authorization) {
            if (
              operationName === "CreateUser" ||
              operationName === "CreateLoginToken"
            ) {
              return {};
            }
          }

          const token = req.headers.authorization?.split(" ")[1];

          // Verify user with token
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
