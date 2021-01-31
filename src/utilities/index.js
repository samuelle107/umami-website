export const fetcher = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error(`An error occurred while fetching the data at ${url}`);
    error.info = await res.json();
    error.status = res.status;

    throw error;
  }

  return res.json();
};

export const test = () => 12;

export const toPluralize = (baseWord, quantity) => (quantity !== 1 ? `${baseWord}s` : baseWord);

export const capitalize = (word) => word.split(' ').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');

export const convertTagToOptions = (recipeTags) => recipeTags.map((recipeTag) => ({
  value: recipeTag.tag.split(' ').join('-'),
  label: capitalize(recipeTag.tag),
}));
