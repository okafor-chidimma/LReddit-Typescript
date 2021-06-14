import { MikroORM } from "@mikro-orm/core";

import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import config from "./mikro-orm.config";

const main = async () => {
  //db configuration
  const orm = await MikroORM.init(config);
  //run migrations automatically
  await orm.getMigrator().up();
  // const post = orm.em.create(Post, { title: "my new post" });
  // await orm.em.persistAndFlush(post);
  // const posts = await orm.em.find(Post, {});
  // console.log(posts, "posts");
  //console.log(orm.em);
};
main().catch((err) => {
  console.log(err, "error");
});

