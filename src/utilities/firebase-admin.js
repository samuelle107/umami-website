import * as firebaseAdmin from 'firebase-admin';

export const verifyIdToken = (token) => {
  if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert({
        privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY.replace(/\\n/g, '\n'),
        clientEmail: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
      }),
      databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
    });
  }

  return firebaseAdmin.auth().verifyIdToken(token).catch((error) => {
    throw error;
  });
};

export default firebaseAdmin;
