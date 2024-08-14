import { Food } from "./FoodStructures";

const FDA_API_KEY = import.meta.env.VITE_FDA_API_KEY;
const SPOONACULAR_API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const FDABaseUrl = "https://api.nal.usda.gov/fdc/v1/";
const SpoonacularBaseUrl = "https://api.spoonacular.com/";

export const searchFDAFood = async (query: string) => {
  const response = await fetch(
    `${FDABaseUrl}search?api_key=${FDA_API_KEY}&query=${query}&dataType=Foundation,Survey%20%28FNDDS%29&pageSize=50&pageNumber=1`,
  );
  return await response.json();
};

export const getFDAFoodDetails = async (fdcId: number) => {
  const response = await fetch(`${FDABaseUrl}${fdcId}?api_key=${FDA_API_KEY}`);
  return await response.json();
};

export const searchSpoonacularFood: (query: string) => Promise<Food[]> = async (
  query: string,
) => {
  const response = await fetch(
    `${SpoonacularBaseUrl}recipes/complexSearch?query=${query}&apiKey=${SPOONACULAR_API_KEY}`,
  );
  const data = await response.json();
  const foodResults: Food[] = data.results.map(
    (result: { id: number; title: string; image: string }) => ({
      id: result.id,
      name: result.title,
      image: result.image,
    }),
  );
  return foodResults;
};

export const getSpoonacularFoodDetails = async (food: Food) => {
  const response = await fetch(
    `${SpoonacularBaseUrl}recipes/${food.id}/information?apiKey=${SPOONACULAR_API_KEY}`,
  );
  return await response.json();
};

export const getSpoonacularFoodIngredients: (
  food: Food,
) => Promise<Food[]> = async (food: Food) => {
  const data = await getSpoonacularFoodDetails(food);
  console.log("Ingredients: ", data.extendedIngredients);
  return data.extendedIngredients.map(
    (ingredient: { id: number; nameClean: string; image: string }) => ({
      id: ingredient.id,
      name: ingredient.nameClean,
      image: ingredient.image,
    }),
  );
};
