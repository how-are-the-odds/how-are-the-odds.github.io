import {
  Select,
  Button,
  Container,
  Input,
  Stack,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import {
  getSpoonacularFoodIngredients,
  searchSpoonacularFood,
} from "./ApiCalls";
import { AllergyList, Food } from "./FoodStructures";
import { useEffect, useState } from "react";
import { uniqBy } from "../utils";
import { readAllergyData } from "./AllergyChecking";
import { IngredientsDisplay } from "./IngredientsDisplay";

const API_TO_USE = "spoonacular";

const searchFood = (foodToCheck: string) => {
  if (API_TO_USE === "spoonacular") {
    return searchSpoonacularFood(foodToCheck);
  }

  throw Error("API not implemented");
};

const getFoodIngredients = (food: Food) => {
  if (API_TO_USE === "spoonacular") {
    return getSpoonacularFoodIngredients(food);
  }

  throw Error("API not implemented");
};

const AllergyChecker = () => {
  const [foodToCheck, setFoodToCheck] = useState("");
  const [foodsToDisplay, setFoodsToDisplay] = useState<Food[]>([]);
  const [ingredientsToDisplay, setIngredientsToDisplay] = useState<Food[]>([]);
  const [displaySearchList, setDisplaySearchList] = useState(true);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [allergyLists, setAllergyLists] = useState<AllergyList[]>([]);
  const [activePeople, setActivePeople] = useState<string[]>([]);
  const [activeAllergyLists, setActiveAllergyLists] = useState<AllergyList[]>(
    [],
  );

  useEffect(() => {
    readAllergyData().then((allergyData) => {
      setAllergyLists(allergyData);
    });
  }, []);

  useEffect(() => {
    setActiveAllergyLists(
      allergyLists.filter((allergyList) =>
        activePeople.includes(allergyList.person),
      ),
    );
  }, [activePeople]);

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

  const handleChange = (event: SelectChangeEvent<typeof activePeople>) => {
    const {
      target: { value },
    } = event;
    setActivePeople(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
  };

  const personSelector = (
    <Select multiple size="small" value={activePeople} onChange={handleChange}>
      {allergyLists.map((allergyList) => (
        <MenuItem key={allergyList.person} value={allergyList.person}>
          {allergyList.person}
        </MenuItem>
      ))}
    </Select>
  );

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
    <div>
      <h1>Recipe App</h1>

      <Container maxWidth="sm">
        <Stack>
          {personSelector}
          <Input
            value={foodToCheck}
            inputProps={{ min: 0, style: { textAlign: "center" } }}
            onChange={(e) => setFoodToCheck(e.target.value)}
          ></Input>
          <Button onClick={() => handleSearchButtonClick(foodToCheck)}>
            Check Allergies
          </Button>
          {displaySearchList ? displayOfFoods : displayOfIngredients}
        </Stack>
      </Container>
    </div>
  );
};

export default AllergyChecker;
