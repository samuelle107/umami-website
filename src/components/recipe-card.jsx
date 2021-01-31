import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const RecipeCardWrapper = styled(motion.div)`
  flex-basis: calc((100%) - 64px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 44px;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;

  :hover {
    cursor: pointer;
  }

  @media only screen and (min-width: 1024px) {
    flex-basis: calc((100% / 3) - 64px);
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    flex-basis: calc((100% / 2) - 64px);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 120%;
  overflow: hidden;
`;

const Image = styled(motion.div)`
  width: 100%;
  height: 0;
  padding-bottom: 120%;
  background-size: cover;
  background-image: url(${({ src }) => src});
  background-position: center;
`;

const Author = styled.h5`
  // padding-top: 22px;
`;

const Title = styled.h3`
  padding-top: 24px;
`;

const RecipeCard = ({ index, recipe }) => (
  <Link href={`/recipes/${recipe._id}`}>
    <RecipeCardWrapper
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index / 10 }}
    >
      <ImageWrapper>
        <Image
          src={recipe.imageUrl}
          whileHover={{
            scale: 1.05,
            transition: {
              duration: 0.3,
            },
          }}
        />
      </ImageWrapper>
      <div>
        <Title>{recipe.title}</Title>
        <Author>{`By ${recipe.author}`}</Author>
      </div>
    </RecipeCardWrapper>
  </Link>
);

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    author: PropTypes.string,
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    recipeId: PropTypes.string,
  }).isRequired,
};

export default RecipeCard;
