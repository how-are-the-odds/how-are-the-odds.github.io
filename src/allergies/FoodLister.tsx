import { AllergyList, Allergy } from "./FoodStructures";
import { Food } from "./FoodStructures";
import { useState, useEffect } from "react";
import { readFoodList } from "./FoodReading";
import { Autocomplete, TextField } from "@mui/material";
import { checkFoodAllergy } from "./AllergyChecking";
import { severityNumberToColor } from "./utils";

interface FoodListerProps {
  ActiveAllergyList: AllergyList[];
}

export const FoodLister = ({ ActiveAllergyList }: FoodListerProps) => {
  const [foodList, setFoodList] = useState<Food[]>([]);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);

  useEffect(() => {
    readFoodList().then((foodList) => {
      setFoodList(foodList);
    });
  }, []);

  const allergyCheckOutput = (food: Food) => {
    const activatedAllergies = ActiveAllergyList.map((allergyList) => ({
      person: allergyList.person,
      allergies: checkFoodAllergy(allergyList, food),
    })).filter((obj) => obj.allergies.length > 0);

    if (activatedAllergies.length == 0) {
      return <div> No Allergy Matches! </div>;
    }

    const mostSevereActivatedAllergies = activatedAllergies.map((obj) => ({
      worstAllergy: obj.allergies.reduce(
        (worstAllergyYet, newAllergy) =>
          worstAllergyYet.isMoreSevereThan(newAllergy)
            ? worstAllergyYet
            : newAllergy,
        new Allergy("No Allergy", "10. No reaction", []),
      ),
      person: obj.person,
    }));

    // const allergicPeople = activatedAllergies.map((a) => a.person);

    return (
      <div>
        {mostSevereActivatedAllergies.map((obj) => {
          const severityColor = severityNumberToColor(
            obj.worstAllergy.severityRank(),
          );
          return (
            <div style={{ color: severityColor }} key={obj.person}>
              {obj.person +
                " is allergic because of their " +
                obj.worstAllergy.name +
                " allergy."}
            </div>
          );
        })}{" "}
      </div>
    );
  };

  return (
    <div>
      <h1>Food Lookup</h1>
      <Autocomplete
        options={foodList}
        getOptionLabel={(option) => option.name + " " + (option.emoji ?? "")}
        renderInput={(params) => <TextField {...params} label="Food" />}
        onChange={(event, value) => {
          setSelectedFood(value);
        }}
        isOptionEqualToValue={(food1, food2) => food1.name == food2.name}
      />
      {selectedFood ? selectedFood.name : ""}
      {selectedFood ? allergyCheckOutput(selectedFood) : ""}
    </div>
  );
};
