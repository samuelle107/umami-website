import { db, firebase } from '../../../src/utilities/firebase';

export default async (req, res) => {
  const data = JSON.parse(req.body);
  const { uid, tags } = data;
  const ref = db.collection('recipes').doc();
  const errors = [];

  ref.set({
    ...data,
    recipeId: ref.id,
  });

  try {
    db.collection('userRecipes')
      .doc(uid)
      .collection('recipes')
      .doc(ref.id)
      .set({
        recipeId: ref.id,
      });
  } catch (err) {
    errors.push(err);
  }

  try {
    db.collection('tags')
      .doc('cuisine')
      .update({
        tags: firebase.firestore.FieldValue.arrayUnion(tags.cuisine),
      });
  } catch (err) {
    errors.push(err);
  }

  try {
    if (tags.dietaryPreference.length === 0) {
      return;
    }

    db.collection('tags')
      .doc('dietaryPreference')
      .update({
        tags: firebase.firestore.FieldValue.arrayUnion(tags.dietaryPreference),
      });
  } catch (err) {
    errors.push(err);
  }

  try {
    db.collection('tags')
      .doc('meal')
      .update({
        tags: firebase.firestore.FieldValue.arrayUnion(tags.meal),
      });
  } catch (err) {
    errors.push(err);
  }

  if (errors.length > 1) {
    res.json({ error: errors });
  } else {
    res.json({ recipeId: ref.id });
  }
};
