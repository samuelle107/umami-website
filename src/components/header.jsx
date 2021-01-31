import React, { useContext } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';
import TextButton from './text-button';
import { AuthContext } from '../context-providers/auth-provider';
import { signOut } from '../utilities/firebase';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  z-index: 1000px;
`;

const Title = styled.h4``;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const ButtonWrapper = styled.div`
  margin-left: 48px;
`;

const Header = () => {
  const router = useRouter();
  const { route } = router;
  const isCurrentRoute = (currentRoute) => route === currentRoute;
  const [user, setUser] = useContext(AuthContext);

  const onLoginLogOutClick = () => {
    if (user) {
      signOut(() => setUser(null));
    }
  };

  return (
    <HeaderWrapper>
      <Title>Umami</Title>
      <LinkContainer>
        <Link href="/" passHref>
          <ButtonWrapper>
            <TextButton isActive={isCurrentRoute('/')}>Home</TextButton>
          </ButtonWrapper>
        </Link>
        <Link href="/recipes" passHref>
          <ButtonWrapper>
            <TextButton isActive={isCurrentRoute('/recipes')}>
              Recipes
            </TextButton>
          </ButtonWrapper>
        </Link>
        <Link href="/recipes/submit" passHref>
          <ButtonWrapper>
            <TextButton isActive={isCurrentRoute('/recipes/submit')}>
              Submit
            </TextButton>
          </ButtonWrapper>
        </Link>
        <Link href="/about" passHref>
          <ButtonWrapper>
            <TextButton isActive={isCurrentRoute('/about')}>About</TextButton>
          </ButtonWrapper>
        </Link>
        <Link href={user ? '/' : '/login'} passHref>
          <ButtonWrapper>
            <TextButton
              isActive={isCurrentRoute('/login')}
              onClick={onLoginLogOutClick}
              type={user ? 'error' : undefined}
            >
              {user ? 'Logout' : 'Login'}
            </TextButton>
          </ButtonWrapper>
        </Link>
      </LinkContainer>
    </HeaderWrapper>
  );
};

export default Header;
