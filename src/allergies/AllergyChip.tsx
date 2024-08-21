import { Allergy } from "./FoodStructures";
import { Tooltip, Chip } from "@mui/material";
import { severityNumberToColor } from "./utils";

interface AllergyChipProps {
  allergy: Allergy;
}

export const AllergyChip = ({ allergy }: AllergyChipProps) => {
  return (
    <>
      <Tooltip title={allergy.severity} followCursor key={allergy.name}>
        <Chip
          label={allergy.name}
          variant="filled"
          style={{
            ...unselectableStyle,
            ...borderStyle,
            ...fontStyles,
            backgroundColor: severityNumberToColor(allergy.severityRank()),
          }}
        />
      </Tooltip>
      &nbsp;
    </>
  );
};

const borderStyle: React.CSSProperties = {
  border: "2px solid #000000",
};

const fontStyles: React.CSSProperties = {
  fontFamily: "Roboto",
  fontSize: "1.0em",
  color: "#FFFFFF",
};

const unselectableStyle: React.CSSProperties = {
  userSelect: "none",
  WebkitUserSelect: "none",
  MozUserSelect: "none",
  msUserSelect: "none",
};
