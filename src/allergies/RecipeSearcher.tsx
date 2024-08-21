import { Stack, Input, Button, TextField } from "@mui/material";
import { IngredientsDisplay } from "./IngredientsDisplay";
import { AllergyList, Food } from "./FoodStructures";
import { useState } from "react";
import { uniqBy } from "../utils";
import {
  getSpoonacularFoodIngredients,
  searchSpoonacularFood,
} from "./ApiCalls";

const API_TO_USE = "spoonacular";

interface RecipeSearcherProps {
  activeAllergyLists: AllergyList[];
}

const getFoodIngredients = (food: Food) => {
  if (API_TO_USE === "spoonacular") {
    return getSpoonacularFoodIngredients(food);
  }

  throw Error("API not implemented");
};

const searchFood = (foodToCheck: string) => {
  if (API_TO_USE === "spoonacular") {
    return searchSpoonacularFood(foodToCheck);
  }

  throw Error("API not implemented");
};
export const RecipeSearcher = ({ activeAllergyLists }: RecipeSearcherProps) => {
  const [foodToCheck, setFoodToCheck] = useState("");
  const [foodsToDisplay, setFoodsToDisplay] = useState<Food[]>([]);
  const [ingredientsToDisplay, setIngredientsToDisplay] = useState<Food[]>([]);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [displaySearchList, setDisplaySearchList] = useState(true);

  const handleSearchButtonClick = (foodToCheck: string) => {
    resetSearch();
    searchFood(foodToCheck).then((foods) => {
      setFoodsToDisplay(foods);
    });
  };

  const resetSearch = () => {
    setFoodsToDisplay([]);
    setDisplaySearchList(true);
    setIngredientsToDisplay([]);
    setSelectedFood(null);
  };

  const handleFoodSelectionClick = (food: Food) => {
    getFoodIngredients(food).then((ingredients) => {
      const uniqueIngredients = uniqBy(ingredients, (food: Food) =>
        food.id.toString(),
      );
      setIngredientsToDisplay(uniqueIngredients);
      console.log("Input Foods");
      console.log(uniqueIngredients);
    });
    setSelectedFood(food);
    setDisplaySearchList(false);
  };

  const displayOfFoods = foodsToDisplay.map((food) => {
    return (
      <Button key={food.id} onClick={() => handleFoodSelectionClick(food)}>
        {food.name}
      </Button>
    );
  });

  const displayOfIngredients = (
    <IngredientsDisplay
      ingredientsToDisplay={ingredientsToDisplay}
      setIngredientsToDisplay={setIngredientsToDisplay}
      activeAllergyLists={activeAllergyLists}
      selectedFood={selectedFood}
      setDisplaySearchList={setDisplaySearchList}
    />
  );
  return (
    <Stack>
      <h2>Search for a recipe</h2>
      <TextField
        value={foodToCheck}
        inputProps={{ min: 0, style: { textAlign: "center" } }}
        onChange={(e) => setFoodToCheck(e.target.value)}
        label="Enter a food to check for allergies"
      ></TextField>
      <Button onClick={() => handleSearchButtonClick(foodToCheck)}>
        Check Allergies
      </Button>
      {displaySearchList ? displayOfFoods : displayOfIngredients}
    </Stack>
  );
};
