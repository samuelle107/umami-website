import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';
import TextButton from './text-button';
import { useAuth } from '../context-providers/auth-provider';

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
`;

const ButtonWrapper = styled.div`
  margin-left: 48px;
`;

const Header = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { route } = router;
  const isCurrentRoute = (currentRoute) => route === currentRoute;

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
        <Link href="/login" passHref>
          <ButtonWrapper>
            <TextButton isActive={isCurrentRoute('/login')}>
              {user ? 'Logout' : 'Login'}
            </TextButton>
          </ButtonWrapper>
        </Link>
      </LinkContainer>
    </HeaderWrapper>
  );
};

export default Header;
