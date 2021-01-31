import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Header from './header';
import GlobalStyle from '../utilities/global-style';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100%;
`;

const Spacer = styled.div`
  width: 80%;

  @media only screen and (min-width: 768px) {
    max-width: min(80%, 1600px);
  }
`;

const PageLayout = ({ children }) => (
  <PageWrapper>
    <Spacer>
      <Header />
      <GlobalStyle />
      {children}
    </Spacer>
  </PageWrapper>
);

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageLayout;
