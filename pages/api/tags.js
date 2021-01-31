import { db } from '../../src/utilities/firebase';

export default async (req, res) => {
  try {
    const querySnapshot = await db.collection('tags').get();
    const result = {};
    querySnapshot.forEach((doc) => {
      result[doc.id] = doc.data();
    });

    res.json(result);
  } catch (error) {
    res.json({ error });
  }
};
