import {
  Container,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { AllergyList } from "./FoodStructures";

interface PersonSelectorProps {
  activePeople: string[];
  setActivePeople: Dispatch<SetStateAction<string[]>>;
  allergyLists: AllergyList[];
}

export const PersonSelector = ({
  activePeople,
  setActivePeople,
  allergyLists,
}: PersonSelectorProps) => {
  const handleChange = (event: SelectChangeEvent<typeof activePeople>) => {
    const {
      target: { value },
    } = event;
    setActivePeople(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
  };

  return (
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
};
