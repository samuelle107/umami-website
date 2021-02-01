import React, { useEffect, useContext } from 'react';
import nookies from 'nookies';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AuthContext } from '../../src/context-providers/auth-provider';
import { verifyIdToken } from '../../src/utilities/firebase-admin';
import { toPluralize } from '../../src/utilities';

const RecipeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-item: center;
  width: 100%;
`;

const IntroWrapper = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 80px);
`;

const DetailsWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 44px;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
`;

const Title = styled.h1``;

const Author = styled.h3``;

const Logistics = styled.p``;

const ImageWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
`;

const Image = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  background-size: cover;
  background-image: url(${({ src }) => src});
  background-position: center;
`;

const TwoColumnWrapper = styled.div`
  display: flex;
`;

const IngredientsWrapper = styled.div`
  flex: 1;
  padding: 44px;
`;

const DirectionsWrapper = styled.div`
  flex: 1;
  padding: 44px;
`;

const SubHeader = styled.p`
  color: #1b1c1e;
  font-weight: bold;
`;

const Recipe = ({ recipe, user }) => {
  const [authUser, setAuthUser] = useContext(AuthContext);

  useEffect(() => {
    if (!authUser) {
      setAuthUser(user);
    }
  }, []);

  return (
    <RecipeWrapper>
      <IntroWrapper>
        <DetailsWrapper>
          <div>
            <Title>{recipe.title}</Title>
            <Author>{`By ${recipe.author}`}</Author>
            <Logistics>
              {`This will make approximately ${recipe.servingSize} ${toPluralize('serving', recipe.servingSize)}.`}
            </Logistics>
          </div>
        </DetailsWrapper>
        <ImageWrapper>
          <Image src={recipe.imageUrl} />
        </ImageWrapper>
      </IntroWrapper>
      <TwoColumnWrapper>
        <IngredientsWrapper>
          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients?.map(({ ingredient, quantity, unit }) => (
              <li key={ingredient}>
                <p>{`${quantity} ${unit ? `${unit} of` : ''} ${ingredient}`}</p>
              </li>
            ))}
          </ul>
        </IngredientsWrapper>
        <DirectionsWrapper>
          <h2>Directions</h2>
          <ul>
            {recipe.directions?.map(({ direction, title }, i) => (
              <li key={title}>
                <SubHeader>
                  {`${i + 1}. ${title}`}
                </SubHeader>
                <p>{direction}</p>
              </li>
            ))}
          </ul>
        </DirectionsWrapper>
      </TwoColumnWrapper>
    </RecipeWrapper>
  );
};

export async function getServerSideProps(context) {
  let user = null;

  try {
    const { token } = nookies.get(context);
    user = await verifyIdToken(token);
  } catch (error) {
    nookies.destroy(context, 'token');
  }

  try {
    const recipeResponse = await fetch(
      `https://umami-back-end.herokuapp.com/recipes/${context.query.id}`,
    );
    const recipe = await recipeResponse.json();

    return {
      props: {
        recipe,
        user,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }
}

Recipe.defaultProps = {
  data: {},
};

Recipe.propTypes = {
  data: PropTypes.shape({}),
};

export default Recipe;
