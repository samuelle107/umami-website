import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MultiLabelWrapper = styled.div`
  display: flex;
  margin: 16px 0;
`;

const LabelInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 24px;
`;

const MultiLabelInput = ({ labelInputKey, inputs, name, onChange }) => {
  const [multiLabelValue, setMultiLabelValue] = useState({});

  useEffect(() => {
    onChange(labelInputKey, multiLabelValue);
  }, [multiLabelValue]);

  const onInputChange = (e, id) => {
    setMultiLabelValue((prevState) => ({
      ...prevState,
      [id]: e.target.value,
    }));
  };

  return (
    <MultiLabelWrapper>
      {inputs.map(({ label, id, placeHolder, type }) => (
        <LabelInputContainer>
          <label htmlFor={id}>{label}</label>
          <input
            id={id}
            name={id}
            type={type}
            step={0.1}
            placeholder={placeHolder}
            onChange={(e) => onInputChange(e, id)}
          />
        </LabelInputContainer>
      ))}
    </MultiLabelWrapper>
  );
};

export default MultiLabelInput;
