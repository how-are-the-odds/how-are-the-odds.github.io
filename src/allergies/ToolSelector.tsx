import { Radio, RadioGroup, Container, FormControlLabel } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface ToolSelectorProps {
  toolInUse: string;
  setToolInUse: Dispatch<SetStateAction<string>>;
  availableTools: string[];
}

const toolNamesPretty = (tool: string) => {
  switch (tool) {
    case "AllergyListDisplay":
      return "Allergy List";
    case "RecipeSearcher":
      return "Recipe Checker";
    case "FoodListDisplay":
      return "Food Lookup";
    default:
      return tool;
  }
};

export const ToolSelector = ({
  toolInUse,
  setToolInUse,
  availableTools: toolsAvailable,
}: ToolSelectorProps) => (
  <Container maxWidth={"sm"}>
    <RadioGroup
      aria-label="tool"
      name="tool"
      value={toolInUse}
      onChange={(e) => setToolInUse(e.target.value)}
    >
      {toolsAvailable.map((tool) => (
        <FormControlLabel
          key={tool}
          value={tool}
          control={<Radio />}
          label={toolNamesPretty(tool)}
        />
      ))}
    </RadioGroup>
  </Container>
);
