import {
  Select,
  Container,
  Stack,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
} from "@mui/material";
import { AllergyList } from "./FoodStructures";
import { useEffect, useState } from "react";
import { readAllergyData } from "./AllergyChecking";
import { RecipeSearcher } from "./RecipeSearcher";
import { ToolSelector } from "./ToolSelector";
import { AllergyListDisplay } from "./AllergyListDisplay";
import { FoodLister } from "./FoodLister";

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
    <Container maxWidth="sm">
      <InputLabel id="person-selector-label">
        Select a person (or people)
      </InputLabel>
      <Select
        multiple
        size="small"
        value={activePeople}
        onChange={handleChange}
        labelId="person-selector-label"
      >
        {allergyLists.map((allergyList) => (
          <MenuItem key={allergyList.person} value={allergyList.person}>
            {allergyList.person}
          </MenuItem>
        ))}
      </Select>
    </Container>
  );

  return (
    <Stack>
      <h2>Allergy Checker</h2>
      <Container>{personSelector}</Container>
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
