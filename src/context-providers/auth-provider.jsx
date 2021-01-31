import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import nookies from 'nookies';
import { firebase } from '../utilities/firebase';

const AuthContext = createContext({ user: null });

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => firebase.auth().onIdTokenChanged(async (currentUser) => {
    if (currentUser) {
      const token = await currentUser.getIdToken();
      setUser(currentUser);
      nookies.set(undefined, 'token', token);
    } else {
      setUser(null);
      nookies.set(undefined, 'token', '');
    }
  }), []);

  useEffect(() => {
    const handle = setInterval(async () => {
      const { currentUser } = firebase.auth();

      if (currentUser) {
        await currentUser.getIdToken(true);
      }
    }, 10 * 60 * 1000);

    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
