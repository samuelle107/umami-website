import React, { useState } from 'react';
import nookies from 'nookies';
import styled from 'styled-components';
import RecipeFilter from '../src/components/recipe-filter';
import RecipeCard from '../src/components/recipe-card';
import firebaseAdmin from '../src/utilities/firebase-admin';

const ExploreWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const RecipesWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export async function getServerSideProps(context) {
  const errors = [];
  try {
    const { token } = nookies.get(context);
    await firebaseAdmin.auth().verifyIdToken(token);
  } catch (error) {
    errors.push(error);
  }

  try {
    const tagsResponse = await fetch('https://umami-back-end.herokuapp.com/tags');
    const tags = await tagsResponse.json();
    const recipesResponse = await fetch('https://umami-back-end.herokuapp.com/recipes');
    const recipes = await recipesResponse.json();

    return {
      props: {
        recipes,
        tags,
      },
    };
  } catch (error) {
    const tags = {
      cuisineTags: [],
      dietaryPreferenceTags: [],
      mealTags: [],
    };

    errors.push(error);

    return {
      props: {
        err: errors,
        tags,
        recipes: [],
      },
    };
  }
}

const Recipes = ({ tags, recipes }) => {
  const [allTags, setAllTags] = useState([]);

  return (
    <div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ExploreWrapper>
        <RecipeFilter tags={tags} getSelectedTags={() => {}} />
        <RecipesWrapper>
          {recipes.map((recipe, i) => (
            <RecipeCard key={recipe._id} recipe={recipe} index={i} />
          ))}
        </RecipesWrapper>
      </ExploreWrapper>
    </div>
  );
};

export default Recipes;
