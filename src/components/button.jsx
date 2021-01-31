import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.button`
  border: 1px solid #222;
  background-color: #222;
  color: white;
  padding: 1.25rem 1rem;
  font-size: 0.875rem;
  transition: 0.3s;

  :hover {
    border: 1px solid #444;
    background-color: #444;
    cursor: pointer;
  }
`;

const Button = ({ children, ...props}) => (
  <ButtonWrapper {...props}>
    {children}
  </ButtonWrapper>
);
export default Button;
