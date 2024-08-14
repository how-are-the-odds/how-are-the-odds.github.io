import { Tooltip, Container, Stack, Button } from "@mui/material";

import { AllergyList, Food } from "./FoodStructures";
import { colorScale } from "../utils";
import { checkFoodAllergy } from "./AllergyChecking";

interface IngredientsDisplayProps {
  ingredientsToDisplay: Food[];
  setIngredientsToDisplay: React.Dispatch<React.SetStateAction<Food[]>>;
  activeAllergyLists: AllergyList[];
  selectedFood: Food | null;
  setDisplaySearchList: React.Dispatch<React.SetStateAction<boolean>>;
}

export const IngredientsDisplay = ({
  ingredientsToDisplay,
  setIngredientsToDisplay,
  activeAllergyLists,
  selectedFood,
  setDisplaySearchList,
}: IngredientsDisplayProps) => {
  const severityColorScale = colorScale("rgb(255, 0, 0)", "rgb(0, 60, 255)");

  const numberToColor = (num: number) => {
    if (num < 1 || num > 7) {
      throw RangeError("Unknown severity value: " + num.toString());
    }
    const ratio = (num - 1) / 6.001;
    console.log(num, ratio);
    console.log(severityColorScale(ratio));
    return severityColorScale(ratio);
  };
  return (
    <Stack>
      <Button
        onClick={() => {
          setDisplaySearchList(true);
          setIngredientsToDisplay([]);
        }}
      >
        {selectedFood?.name}
      </Button>
      <h4>Ingredients:</h4>
      {ingredientsToDisplay.map((ingredient) => {
        const matchingAllergies = activeAllergyLists.map((allergyList) => ({
          person: allergyList.person,
          allergies: checkFoodAllergy(allergyList, ingredient),
        }));
        const worstAllergyHit = matchingAllergies
          .map(({ allergies }) =>
            allergies.reduce(
              (acc, curr) => Math.min(acc, curr.severityRank()),
              7,
            ),
          )
          .reduce((acc, curr) => Math.min(acc, curr), 7);
        const totalAllergiesHit = matchingAllergies.reduce(
          (acc, curr) => acc + curr.allergies.length,
          0,
        );
        return (
          <div
            key={ingredient.id}
            style={
              totalAllergiesHit > 0
                ? { color: numberToColor(worstAllergyHit) }
                : { color: "blue" }
            }
          >
            {totalAllergiesHit > 0 ? (
              <Tooltip
                title={matchingAllergies
                  .filter((obj) => obj.allergies.length > 0)
                  .map(
                    (obj) =>
                      obj.person +
                      " is allergic to: " +
                      obj.allergies.reduce(
                        (acc, curr) => acc + curr.name + ", ",
                        "",
                      ),
                  )}
              >
                <Container>{ingredient.name} 🚫</Container>
              </Tooltip>
            ) : (
              <Container>{ingredient.name} ✅</Container>
            )}
          </div>
        );
      })}
    </Stack>
  );
};
