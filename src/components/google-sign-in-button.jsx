import React from 'react';
import styled from 'styled-components';
import { signInWithGoogle } from '../utilities/firebase';

const GoogleSignInButtonStyled = styled.button`
  background-color: #4285f4;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  padding: 10px 16px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500px;
  outline: none;
  appearance: none;
  border: none;
  color: white;
  transition: 0.2s;

  &:hover {
    cursor: pointer;
    background: #2a75f3;
  }
`;

const GoogleSignInButton = ({ onSuccess, onError }) => (
  <GoogleSignInButtonStyled
    onClick={() => signInWithGoogle(onSuccess, onError)}
  >
    Sign in with Google
  </GoogleSignInButtonStyled>
);

GoogleSignInButton.defaultProps = {
  onSuccess: () => {},
  onError: () => {},
};

export default GoogleSignInButton;
