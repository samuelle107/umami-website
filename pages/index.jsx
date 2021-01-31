import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import nookies from 'nookies';
import { verifyIdToken } from '../src/utilities/firebase-admin';
import { AuthContext } from '../src/context-providers/auth-provider';

const imageUrl =
  'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=882&q=80';

const HomeWrapper = styled.div`
  display: flex;
  align-items: center;
  height: calc(100vh - 80px);

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const InfoColumn = styled.div`
  flex: 2;

  @media only screen and (max-width: 768px) {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const ImageColumn = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 3;
  height: 100%;

  @media only screen and (max-width: 768px) {
    flex: 2;
    width: 100%;
  }
`;

const Image = styled(motion.div)`
  max-height: min(1000px, 90%);
  height: 75%;
  width: 70%;
  background: #f8f9fc;
  background-position: center;
  background-size: cover;
  background-image: url(${imageUrl});

  @media only screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
  }
`;

const Title = styled(motion.h1)``;

const SubHeading = styled(motion.h4)``;

const Info = styled(motion.p)``;

const Home = ({ user }) => {
  const [authUser, setAuthUser] = useContext(AuthContext);

  useEffect(() => {
    if (!authUser) {
      setAuthUser(user);
    }
  }, []);

  return (
    <div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <HomeWrapper>
        <InfoColumn>
          <Title
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Umami
          </Title>
          <SubHeading
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            No Bullshit, Just Recipes
          </SubHeading>
          <Info
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Recipes curated by the community to help elevate your cooking
            without the unnecessary backstories.
          </Info>
        </InfoColumn>
        <ImageColumn>
          <Image
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </ImageColumn>
      </HomeWrapper>
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    const { token } = nookies.get(context);
    const user = await verifyIdToken(token);

    return {
      props: {
        user,
      },
    };
  } catch (error) {
    nookies.destroy(context, 'token');

    return {
      props: {
        user: null,
      },
    };
  }
}

export default Home;
