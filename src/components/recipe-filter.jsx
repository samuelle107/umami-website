import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import styled from 'styled-components';

const RecipeFilterWrapper = styled.div`
  margin: 32px 0;
`;

const SelectContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 8px 0;
`;

const FilterMessage = styled.h4``;

const SelectWrapper = styled.div`
  width: ${({ width }) => `${width}px`};
  margin-right: 24px;
`;

const RecipeFilter = ({ tags, getSelectedTags }) => {
  const [cuisineTags, setCuisineTags] = useState([]);
  const [dietaryTags, setDietaryTags] = useState([]);
  const [mealTags, setMealTags] = useState([]);

  useEffect(() => {
    getSelectedTags({ cuisineTags, dietaryTags, mealTags });
  }, [cuisineTags, dietaryTags, mealTags]);

  const createOptions = (recipeTags) => recipeTags.map((tag) => ({
    value: tag, label: tag.charAt(0).toUpperCase() + tag.slice(1),
  }));

  const cuisineOptions = createOptions(tags.cuisine.tags);
  const mealOptions = createOptions(tags.meal.tags);
  const dietaryPreferenceOptions = createOptions(tags.dietaryPreference.tags);

  return (
    <RecipeFilterWrapper>
      <FilterMessage>Filter recipes by:</FilterMessage>
      <SelectContainer>
        <SelectWrapper width={150}>
          <Select options={cuisineOptions} placeholder="Cuisine" />
        </SelectWrapper>
        <SelectWrapper width={150}>
          <Select options={mealOptions} placeholder="Meal" />
        </SelectWrapper>
        <SelectWrapper width={250}>
          <Select options={dietaryPreferenceOptions} placeholder="Dietary Preferences" isMulti />
        </SelectWrapper>
      </SelectContainer>
    </RecipeFilterWrapper>
  );
};

RecipeFilter.propTypes = {
  tags: PropTypes.shape().isRequired,
  getSelectedTags: PropTypes.func.isRequired,
};

export default RecipeFilter;
