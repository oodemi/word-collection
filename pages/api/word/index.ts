import nc, { RequestHandler } from "next-connect";
import database from "../../../middlewares/database";
import { getWords, insertWord } from "../../../db/word";

const maxAge = 1 * 24 * 60 * 60;

const handler = nc();

handler.use(database);

handler.get(async (req: any, res: any) => {
  const words = await getWords(
    req.db,
    req.query.from ? new Date(req.query.from) : undefined,
    req.query.limit ? parseInt(req.query.limit, 20) : undefined
  );

  if (req.query.from && words.length > 0) {
    // This is safe to cache because from defines
    //  a concrete range of posts
    res.setHeader("cache-control", `public, max-age=${maxAge}`);
  }

  res.send({ words });
});

handler.post(async (req: any, res: any) => {
  //   if (!req.user) {
  //     return res.status(401).send("unauthenticated");
  //   }

  console.log(req.body);

  if (!req.body.content)
    return res.status(400).send("You must write something");

  const word = await insertWord(req.db, {
    content: req.body.content,
  });

  return res.json({ word });
});

export default handler;
