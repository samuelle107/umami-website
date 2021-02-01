import React, { useState, useContext, useEffect } from 'react';
import nookies from 'nookies';
import styled from 'styled-components';
import useSWR from 'swr';
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

const queryBuilder = (allTags) => {
  const queries = [];
  const { cuisine, dietaryPreferences, meal } = allTags;

  if (cuisine.length) {
    queries.push(`cuisine=${cuisine}`);
  }

  if (meal.length) {
    queries.push(`meal=${meal}`);
  }

  if (dietaryPreferences.length) {
    dietaryPreferences.forEach((item) => queries.push(`dietaryPreferences=${item}`));
  }

  return queries.length ? `/?${queries.join('&')}` : '';
};

const Recipes = ({ tags, allRecipes, user }) => {
  const [allTags, setAllTags] = useState({
    cuisine: '',
    dietaryPreferences: [],
    meal: '',
  });
  const [recipes, setRecipes] = useState([]);
  const [authUser, setAuthUser] = useContext(AuthContext);
  const { data } = useSWR(
    `https://umami-back-end.herokuapp.com/recipes${queryBuilder(allTags)}`,
    (url) => fetch(url).then((res) => res.json()),
  );

  useEffect(() => {
    setRecipes(allRecipes);
  }, []);

  useEffect(() => {
    setRecipes(data || []);
  }, [data]);

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
        <RecipeFilter tags={tags} getSelectedTags={(value) => setAllTags(value)} />
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
        allRecipes: recipes,
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
        allRecipes: [],
        tags,
        user,
      },
    };
  }
}

export default Recipes;
