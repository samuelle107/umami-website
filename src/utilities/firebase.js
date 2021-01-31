import firebase from 'firebase';
import 'firebase/auth';
import { destroyCookie } from 'nookies';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
}

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = (callBack, onError) => firebase
  .auth()
  .signInWithPopup(provider)
  .then(callBack)
  .catch(onError);

export const signOut = (
  handleSuccess = () => {},
  handleError = (err) => {
    console.log(err);
  },
) => firebase
  .auth()
  .signOut()
  .then(handleSuccess)
  .then(() => {
    destroyCookie(null, 'token');
  })
  .catch(handleError);

export const db = firebase.firestore();

export { firebase };
