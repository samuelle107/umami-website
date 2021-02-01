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
  const [cuisineTags, setCuisineTags] = useState('');
  const [dietaryTags, setDietaryTags] = useState([]);
  const [mealTags, setMealTags] = useState('');

  useEffect(() => {
    getSelectedTags({
      cuisine: cuisineTags,
      dietaryPreferences: dietaryTags,
      meal: mealTags,
    });
  }, [cuisineTags, dietaryTags, mealTags]);

  const createOptions = (recipeTags) => recipeTags.map((recipeTag) => ({
    value: recipeTag.tag,
    label: recipeTag.tag.charAt(0).toUpperCase() + recipeTag.tag.slice(1),
  }));

  const cuisineOptions = createOptions(tags.cuisineTags);
  const mealOptions = createOptions(tags.mealTags);
  const dietaryPreferenceOptions = createOptions(tags.dietaryPreferenceTags);

  return (
    <RecipeFilterWrapper>
      <FilterMessage>Filter recipes by:</FilterMessage>
      <SelectContainer>
        <SelectWrapper width={150}>
          <Select
            options={cuisineOptions}
            placeholder="Cuisine"
            onChange={(option) => setCuisineTags(option.value)}
          />
        </SelectWrapper>
        <SelectWrapper width={150}>
          <Select
            options={mealOptions}
            placeholder="Meal"
            onChange={(option) => setMealTags(option.value)}
          />
        </SelectWrapper>
        <SelectWrapper width={250}>
          <Select
            options={dietaryPreferenceOptions}
            placeholder="Dietary Preferences"
            isMulti
            onChange={(options) => setDietaryTags(options?.map((option) => option.value) || [])}
          />
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
