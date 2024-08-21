import { Food, Allergy, AllergyList } from "./FoodStructures";
import { softMatch } from "../utils";
import { readCSV, CSVData, CSVRow } from "../utils";

const getAllergy: (allergyName: string, allergySeverity: string) => Allergy = (
  allergyName: string,
  allergySeverity: string,
) => {
  if (allergyName.toLowerCase() == "dairy") {
    return Allergy.fromObj({
      name: "Dairy",
      severity: allergySeverity,
      foods: [
        {
          name: "Milk",
          id: 0,
        } as Food,
        {
          name: "Cheese",
          id: 1,
        } as Food,
        {
          name: "Yogurt",
          id: 2,
        } as Food,
        {
          name: "Butter",
          id: 3,
        } as Food,
      ],
    });
  }
  if (allergyName.toLowerCase() == "gluten") {
    return Allergy.fromObj({
      name: "Gluten",
      severity: allergySeverity,
      foods: [
        {
          name: "Wheat",
          id: 0,
        } as Food,
        {
          name: "Bread",
          id: 1,
        } as Food,
        {
          name: "Pasta",
          id: 2,
        } as Food,
        {
          name: "Flour",
          id: 3,
        } as Food,
      ],
    });
  }
  return Allergy.fromObj({
    name: allergyName,
    severity: allergySeverity,
    foods: [
      {
        name: allergyName,
        id: 0,
      } as Food,
    ],
  });
};

export const readAllergyData = async (): Promise<AllergyList[]> => {
  return await readCSV("allergy_list.csv", "\r\n")
    .then((data: CSVData) => {
      if (data.length === 0) {
        throw new Error("No data in CSV file");
      }
      if (data.length < 2) {
        throw new Error("No allergy data in CSV file");
      }

      const headers = data[0];
      const bodyData = data.slice(1);

      return headers.slice(1).map((name: string, ix: number) => {
        const allergyList: AllergyList = {
          person: name,
          allergies: bodyData.reduce(
            (prevAllergies: Allergy[], row: CSVRow) => {
              return row[ix + 1] != "" && row[ix + 1] !== undefined
                ? [...prevAllergies, getAllergy(row[0], row[ix + 1])]
                : prevAllergies;
            },
            [],
          ),
        };
        return allergyList;
      });
    })
    .catch((error) => {
      console.error("Error reading allergy data:", error);
      return [];
    });
};

export const checkFoodAllergy = (allergyList: AllergyList, food: Food) => {
  const activeAllergies = allergyList.allergies.reduce(
    (matchingAllergies: Allergy[], currentAllergy: Allergy) => {
      const matchingFoods = currentAllergy.foods.filter((allergyFood: Food) => {
        return softMatch(allergyFood.name, food.name);
      });
      return matchingFoods.length > 0
        ? [...matchingAllergies, currentAllergy]
        : matchingAllergies;
    },
    [],
  );
  activeAllergies.sort((a, b) => a.severity.localeCompare(b.severity));
  if (activeAllergies.length > 0) {
    return activeAllergies;
  }
  return [];
};
