import axios from 'axios';

export const getRecipe = async (ingredients: string) =>
  await axios.post<{ recipe: string }>(
    '/api/recipe',
    { ingredients },
    { headers: { 'Content-Type': 'application/json' } },
  );
