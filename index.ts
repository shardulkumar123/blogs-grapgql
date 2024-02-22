import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import { gqlServer } from "./src/graphql";
import UserService from "./src/services/users";

const init_app = async () => {
  const app = express();
  const Port = Number(process.env.PORT) || 8001;

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(await gqlServer(), {
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
    })
  );

  app.get("/", (req, res) => {
    res.status(200).send({ message: "Server is up and running!" });
  });

  app.listen(Port, () => console.log(`Server is running on Port: ${Port}`));
};

init_app();
