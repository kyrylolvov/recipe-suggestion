import axios from 'axios';

export const getRecipe = async (ingredients: string) =>
  await axios.post<string>('/api/recipe', { ingredients }, { headers: { 'Content-Type': 'application/json' } });
