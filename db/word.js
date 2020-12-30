import { nanoid } from "nanoid";

export async function getWords(db, from = new Date(), limit) {
  console.log(db);

  return db
    .collection("word-list")
    .find({
      ...(from && {
        createdAt: {
          $lte: from,
        },
      }),
    })
    .sort({ createdAt: -1 })
    .limit(limit | 20)
    .toArray();
}

export async function insertWord(db, { content }) {
  return db
    .collection("word-list")
    .insertOne({
      _id: nanoid(12),
      content,
      createdAt: new Date(),
    })
    .then(({ ops }) => ops[0]);
}
