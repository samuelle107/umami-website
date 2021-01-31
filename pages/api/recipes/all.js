import { db } from '../../../src/utilities/firebase';

const isSubArray = (a, b) => b.every((v) => a.includes(v));

export default async (req, res) => {
  try {
    const querySnapshot = await db.collection('recipes').get();
    const result = querySnapshot.docs.map((doc) => doc.data());
    const queryTags = req.query.tags ? JSON.parse(req.query.tags) : [];
    const filteredResult = queryTags.length > 0
      ? result.filter(({ tags }) => isSubArray(tags, queryTags))
      : result;

    res.json(filteredResult);
  } catch (error) {
    res.status(404);
    res.json({ error });
  }
};
