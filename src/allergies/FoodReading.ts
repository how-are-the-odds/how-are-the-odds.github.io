import { readCSV, CSVData } from "../utils";
import { Food } from "./FoodStructures";

export const readFoodList = async (): Promise<Food[]> => {
  return await readCSV("food_list.csv", "\n")
    .then((data: CSVData) => {
      if (data.length === 0) {
        throw new Error("No data in CSV file");
      }
      if (data.length < 2) {
        throw new Error("No food data in CSV file");
      }

      const bodyData = data.slice(1);

      return bodyData.map((row, ix) => {
        const food = {
          name: row[0],
          id: ix,
          emoji: row[2],
        } as Food;
        return food;
      });
    })
    .catch((error) => {
      console.error("Error reading allergy data:", error);
      return [];
    });
};
