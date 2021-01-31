import React from 'react';
import nookies from 'nookies';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import GoogleSignInButton from '../src/components/google-sign-in-button';
import firebaseAdmin from '../src/utilities/firebase-admin';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 80px);
`;

const FormStyled = styled.div`
  width: min(80%, 420px);
`;

const HeaderStyled = styled.h2`
  margin-bottom: 26px;
  font-size: 24px;
`;

const Login = () => {
  const router = useRouter();

  return (
    <LoginContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <FormStyled>
        <HeaderStyled>Login to Umami</HeaderStyled>
        <GoogleSignInButton
          onSuccess={() => router.push('/')}
        />
      </FormStyled>
    </LoginContainer>
  );
};

export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context);
    await firebaseAdmin.auth().verifyIdToken(cookies.token);

    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  } catch (err) {
    nookies.destroy(context, 'token');
    return {
      props: {
        data: null,
      },
    };
  }
}

export default Login;
