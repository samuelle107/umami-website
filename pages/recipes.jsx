import React, { useState, useContext, useEffect } from 'react';
import nookies from 'nookies';
import styled from 'styled-components';
import RecipeFilter from '../src/components/recipe-filter';
import RecipeCard from '../src/components/recipe-card';
import firebaseAdmin from '../src/utilities/firebase-admin';
import { AuthContext } from '../src/context-providers/auth-provider';

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

const Recipes = ({ tags, recipes, user }) => {
  const [allTags, setAllTags] = useState([]);
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

export async function getServerSideProps(context) {
  const errors = [];
  let user = null;

  try {
    const { token } = nookies.get(context);
    user = await firebaseAdmin.auth().verifyIdToken(token);
  } catch (error) {
    nookies.destroy(context, 'token');
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
        user,
      },
    };
  } catch (error) {
    errors.push(error);

    const tags = {
      cuisineTags: [],
      dietaryPreferenceTags: [],
      mealTags: [],
    };

    return {
      props: {
        err: errors,
        recipes: [],
        tags,
        user,
      },
    };
  }
}

export default Recipes;
