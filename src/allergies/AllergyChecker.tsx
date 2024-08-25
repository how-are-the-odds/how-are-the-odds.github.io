import { Container, Stack } from "@mui/material";
import { AllergyList } from "./FoodStructures";
import { useEffect, useState } from "react";
import { readAllergyData } from "./AllergyChecking";
import { RecipeSearcher } from "./RecipeSearcher";
import { ToolSelector } from "./ToolSelector";
import { AllergyListDisplay } from "./AllergyListDisplay";
import { FoodLister } from "./FoodLister";
import { PersonSelector } from "./PersonSelector";

const availableTools = [
  "RecipeSearcher",
  "AllergyListDisplay",
  "FoodListDisplay",
];

const AllergyChecker = () => {
  const [allergyLists, setAllergyLists] = useState<AllergyList[]>([]);
  const [activePeople, setActivePeople] = useState<string[]>([]);
  const [activeAllergyLists, setActiveAllergyLists] = useState<AllergyList[]>(
    [],
  );
  const [toolInUse, setToolInUse] = useState<string>("");

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
  }, [activePeople, allergyLists]);

  return (
    <Stack>
      <h2>Allergy Checker</h2>
      <PersonSelector
        activePeople={activePeople}
        setActivePeople={setActivePeople}
        allergyLists={allergyLists}
      />
      <ToolSelector
        availableTools={availableTools}
        toolInUse={toolInUse}
        setToolInUse={setToolInUse}
      />

      <Container maxWidth="sm">
        {
          {
            RecipeSearcher: (
              <RecipeSearcher activeAllergyLists={activeAllergyLists} />
            ),
            AllergyListDisplay: (
              <AllergyListDisplay activeAllergyLists={activeAllergyLists} />
            ),
            FoodListDisplay: (
              <FoodLister ActiveAllergyList={activeAllergyLists} />
            ),
          }[toolInUse]
        }
      </Container>
    </Stack>
  );
};

export default AllergyChecker;
