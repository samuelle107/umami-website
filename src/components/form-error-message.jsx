import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ErrorMessage = styled.p`
  color: #B00020;
  margin: 4px 0;
  font-size: 0.7rem;
`;

const FormErrorMessage = ({ errors, name }) => {
  try {
    if (!errors || Object.keys(errors).length === 0) {
      return null;
    }

    const error = name.split('.').reduce((p, prop) => p[prop], errors);

    if (!error) {
      return null;
    }

    return (
      <ErrorMessage>{error.message.charAt(0).toUpperCase() + error.message.slice(1)}</ErrorMessage>
    );
  } catch (err) {
    return null;
  }
};

FormErrorMessage.propTypes = {
  errors: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

export default FormErrorMessage;
