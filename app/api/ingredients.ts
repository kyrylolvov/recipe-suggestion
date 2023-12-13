import axios from 'axios';

export const getRecipe = async (ingredients: string) =>
  await axios.post<{ recipe: string }>(
    '/recipe/api',
    { ingredients },
    { headers: { 'Content-Type': 'application/json' } },
  );
