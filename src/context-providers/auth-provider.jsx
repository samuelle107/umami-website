import React, { createContext, useContext, useEffect, useState } from 'react';
import nookies from 'nookies';
import PropTypes from 'prop-types';
import { firebase } from '../utilities/firebase';

export const AuthContext = createContext({ user: null });

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(
    () =>
      firebase.auth().onIdTokenChanged(async (currentUser) => {
        if (currentUser) {
          const token = await currentUser.getIdToken();
          setUser(currentUser);
          nookies.set(undefined, 'token', token, {
            maxAge: 10 * 24 * 60 * 60,
          });
        } else {
          setUser(null);
          nookies.set(undefined, 'token', '');
        }
      }),
    [],
  );

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
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

AuthProvider.defaultProps = {
  children: null,
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
