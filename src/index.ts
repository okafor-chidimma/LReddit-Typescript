import express from "express";
import { MikroORM } from "@mikro-orm/core";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { __prod__ } from "./constants";
import config from "./mikro-orm.config";
import PostResolver from "./resolvers/post";

const main = async () => {
  //db configuration
  const orm = await MikroORM.init(config);
  //run migrations automatically
  await orm.getMigrator().up();
  //setup the express server
  const app = express();
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver],
      validate: false,
    }),
  });
  apolloServer.applyMiddleware({ app });
  app.listen(3000, () => {
    console.log("app is running");
  });
};
main().catch((err) => {
  console.log(err, "error");
});
