import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MultiCheckBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 24px 0;
`;

const OptionWrapper = styled.p`
  font-size: 14px;
  margin: 4px 0;
`;

const Heading = styled.h4`
  margin: 4px 0;
`;

const MultiOptions = ({
  title,
  options,
  isMulti,
  getSelectedOptions,
}) => {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  useEffect(() => {
    getSelectedOptions(selectedCheckboxes);
  }, [selectedCheckboxes]);

  const onChange = (e, option) => {
    if (e.target.checked && isMulti) {
      setSelectedCheckboxes((prevProps) => [...prevProps, option]);
    } else if (e.target.checked) {
      setSelectedCheckboxes([option]);
    } else {
      setSelectedCheckboxes((prevProps) => prevProps.filter((item) => item !== option));
    }
  };

  return (
    <MultiCheckBoxContainer>
      <Heading>{title}</Heading>
      {options.map((option) => (
        <OptionWrapper key={option}>
          <input
            type="checkbox"
            checked={selectedCheckboxes.includes(option)}
            onChange={(e) => onChange(e, option)}
            disabled={
              selectedCheckboxes.length !== 0
              && !selectedCheckboxes.includes(option)
              && !isMulti
            }
          />
          {option}
        </OptionWrapper>
      ))}
    </MultiCheckBoxContainer>
  );
};

MultiOptions.defaultProps = {
  isMulti: true,
};

MultiOptions.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  getSelectedOptions: PropTypes.func.isRequired,
  isMulti: PropTypes.bool,
};

export default MultiOptions;
