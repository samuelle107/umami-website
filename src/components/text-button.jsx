import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const getButtonHoverColor = (type) => {
  switch (type) {
    case 'error':
      return '#B00020';
    default:
      return '#222';
  }
};

const TextButtonWrapper = styled.p`
  color: ${({ isActive }) => (isActive ? 'black' : '#989898')};
  transition: 0.3s;
  font-size: 12px;
  -webkit-user-select: none; /* Safari */        
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */

  :hover {
    color: ${({ type }) => getButtonHoverColor(type)};
    transition: 0.3s;
    cursor: pointer;
  }
`;

TextButtonWrapper.defaultProps = {
  type: 'normal',
};

const TextButton = ({
  children,
  isActive,
  onClick,
  type,
}) => (
  <TextButtonWrapper
    isActive={isActive}
    onClick={onClick}
    type={type}
  >
    {children}
  </TextButtonWrapper>
);

TextButton.defaultProps = {
  isActive: false,
  onClick: () => {},
  type: 'normal',
};

TextButton.propTypes = {
  children: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

export default TextButton;
