import React, { useEffect, useContext } from 'react';
import CreatableSelect from 'react-select/creatable';
import nookies from 'nookies';
import PropTypes from 'prop-types';
import Select from 'react-select';
import styled from 'styled-components';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import firebaseAdmin from '../../src/utilities/firebase-admin';
import Button from '../../src/components/button';
import TextButton from '../../src/components/text-button';
import ErrorMessage from '../../src/components/form-error-message';
import { convertTagToOptions } from '../../src/utilities';
import { AuthContext } from '../../src/context-providers/auth-provider';

const SubmitWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 128px 0;
`;

const FormWrapper = styled.div`
  width: 100%;

  @media only screen and (min-width: 768px) {
    width: 50%;
  }
`;

const Label = styled.label`
  font-size: 1.125rem;
  margin-bottom: 4px;
`;

const Hint = styled.p`
  margin: 0;
  font-size: 0.875rem;
  margin-bottom: 4px;
`;

const Category = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 96px;

  textarea {
    margin-top: 8px;
  }
`;

const Field = styled.div`
  margin: 12px 0;
`;

const Input = styled.input`
  width: ${({ width }) => width};
  border: 1px solid ${({ hasError }) => (hasError ? '#B00020' : '#CCCCCC')};
  background-color: ${({ hasError }) => (hasError ? '#FEF1F2' : 'white')};
`;

const RemoveItemButtonContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: -25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const validationSchema = yup.object().shape({
  imageUrl: yup.string(),
  directions: yup.array().required().min(0),
  servingSize: yup.number().required().min(0),
  title: yup.string().required().min(5).max(40),
  ingredients: yup.array().required().min(0),
  meal: yup.object().required(),
  cuisine: yup.object().required(),
});

const Submit = ({ userData, tags }) => {
  console.log(userData);
  const [authUser, setAuthUser] = useContext(AuthContext);

  useEffect(() => {
    if (!authUser) {
      setAuthUser(userData);
    }
  }, []);

  const router = useRouter();
  const { control, errors, handleSubmit, register } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const {
    fields: ingredients,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: 'ingredients',
  });
  const {
    fields: directions,
    append: appendDirection,
    remove: removeDirection,
  } = useFieldArray({
    control,
    name: 'directions',
  });

  const onSubmit = async (data) => {
    const { meal, cuisine, dietaryPreferences, ...remainingData } = {
      ...data,
      ...userData,
    };
    const postBody = {
      ...remainingData,
      author: remainingData.name,
      tags: {
        meal: meal.value.toLowerCase(),
        cuisine: cuisine.value.toLowerCase(),
        dietaryPreferences:
          dietaryPreferences?.map((item) => item.value.toLowerCase()) || [],
      },
    };
    console.log(postBody)

    try {
      const result = await fetch(
        'https://umami-back-end.herokuapp.com/recipes',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postBody),
        }
      );
      const { id } = await result.json();

      router.push(`/recipes/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SubmitWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <FormWrapper>
        <form
          style={{ display: 'flex', flexDirection: 'column' }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Category>
            <Field>
              <Label>Title</Label>
              <Hint>Give a title for others to discover.</Hint>
              <Input
                type="text"
                placeholder="Tonkotsu Ramen"
                name="title"
                ref={register}
                width="100%"
                hasError={errors.title}
              />
              <ErrorMessage errors={errors} name="title" />
            </Field>
            <Field>
              <Label>Serving Size</Label>
              <Hint>Around how many servings does your recipe make?</Hint>
              <Input
                type="number"
                placeholder="1"
                name="servingSize"
                ref={register}
                width="70px"
                defaultValue={2}
                hasError={errors.servingSize}
              />
              <ErrorMessage errors={errors} name="servingSize" />
            </Field>
          </Category>
          <Category>
            <Label>Ingredients</Label>
            <Hint>
              Share those secrets! Let everyone taste your recipe the way it was
              intended.
            </Hint>
            <ErrorMessage errors={errors} name="ingredients" />
            <ul>
              {ingredients.map((item, index) => (
                <li key={item.id}>
                  <Input
                    name={`ingredients[${index}].quantity`}
                    placeholder="2"
                    ref={register()}
                    type="number"
                    step="0.05"
                    width="60px"
                  />
                  <Input
                    name={`ingredients[${index}].unit`}
                    placeholder="tsp"
                    ref={register()}
                    width="60px"
                  />
                  <div style={{ position: 'relative' }}>
                    <Input
                      name={`ingredients[${index}].ingredient`}
                      placeholder="miso"
                      ref={register()}
                      width="120px"
                    />
                    <RemoveItemButtonContainer>
                      <TextButton
                        onClick={() => removeIngredient(index)}
                        type="error"
                      >
                        ✕
                      </TextButton>
                    </RemoveItemButtonContainer>
                  </div>
                </li>
              ))}
            </ul>
            <TextButton onClick={() => appendIngredient({})}>
              + Ingredient
            </TextButton>
          </Category>
          <Category>
            <Label>Directions</Label>
            <Hint>Step by step, give me directions.</Hint>
            <ErrorMessage errors={errors} name="directions" />
            <ul>
              {directions.map((item, index) => (
                <li key={item.id}>
                  <div style={{ flex: 1, position: 'relative' }}>
                    <Input
                      name={`directions[${index}].title`}
                      placeholder="Preparing the Chashu"
                      ref={register()}
                      type="text"
                      width="100%"
                    />
                    <RemoveItemButtonContainer>
                      <TextButton
                        onClick={() => removeDirection(index)}
                        type="error"
                      >
                        ✕
                      </TextButton>
                    </RemoveItemButtonContainer>
                  </div>
                  <textarea
                    name={`directions[${index}].direction`}
                    placeholder="Mix the soy sauce, the spring onions, ..."
                    ref={register()}
                    rows={8}
                  />
                </li>
              ))}
            </ul>
            <TextButton onClick={() => appendDirection({})}>
              + Direction
            </TextButton>
          </Category>
          <Category>
            <Label>Tags</Label>
            <Hint>What kind of meal is this?</Hint>
            <Controller
              name="meal"
              control={control}
              options={convertTagToOptions(tags.mealTags)}
              as={Select}
            />
            <ErrorMessage errors={errors} name="meal" />
            <Hint>
              What dietary preferences does this recipe have? You can add a new
              one if it is not listed. (Optional)
            </Hint>
            <Controller
              name="dietaryPreferences"
              control={control}
              isMulti
              options={convertTagToOptions(tags.dietaryPreferenceTags)}
              as={CreatableSelect}
            />
            <Hint>
              What kind of cuisine is this? You can add a new one if it is not
              listed.
            </Hint>
            <Controller
              name="cuisine"
              control={control}
              options={convertTagToOptions(tags.cuisineTags)}
              as={CreatableSelect}
            />
            <ErrorMessage errors={errors} name="cuisine" />
          </Category>
          <Category>
            <Label>Upload Image</Label>
            <Hint>
              The creator of the website was too cheap to pay for storage, so
              you can only provide a link.
            </Hint>
            <Input
              type="text"
              placeholder="https://i.imgur.com/SGBAcR7.jpg"
              name="imageUrl"
              ref={register}
              width="100%"
              hasError={errors.imageUrl}
            />
            <ErrorMessage errors={errors} name="imageUrl" />
          </Category>
          <Button type="submit">Submit</Button>
        </form>
      </FormWrapper>
    </SubmitWrapper>
  );
};

export async function getServerSideProps(context) {
  let tags = {
    cuisineTags: [],
    dietaryPreferenceTags: [],
    mealTags: [],
  };

  try {
    const tagsResponse = await fetch(
      'https://umami-back-end.herokuapp.com/tags'
    );
    tags = await tagsResponse.json();
  } catch (error) {
    console.log(error);
  }

  try {
    const cookies = nookies.get(context);
    const user = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    return {
      props: {
        userData: user,
        tags,
      },
    };
  } catch (err) {
    nookies.destroy(context, 'token');
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
}

Submit.defaultProps = {
  userData: {
    email: '',
    name: '',
    uid: '',
  },
};

Submit.propTypes = {
  userData: PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string,
    uid: PropTypes.string,
  }),
};

export default Submit;
