import { db } from '../../../src/utilities/firebase';

export default async (req, res) => {
  db.collection('recipes')
    .doc(req.query.id)
    .get()
    .then((doc) => res.json(doc.data()))
    .catch((err) => {
      res.status(404);
      res.json({ err });
    });
};
