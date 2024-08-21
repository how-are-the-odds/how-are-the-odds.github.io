import { AllergyChip } from "./AllergyChip";
import { AllergyList } from "./FoodStructures";
import { Card, Typography } from "@mui/material";

interface AllergyListDisplayProps {
  activeAllergyLists: AllergyList[];
}

export const AllergyListDisplay: React.FC<AllergyListDisplayProps> = ({
  activeAllergyLists,
}) => {
  return (
    <div style={{ textAlign: "center", lineHeight: "2.0em" }}>
      {activeAllergyLists.map((allergyList) => (
        <div key={allergyList.person}>
          <Card variant="outlined" style={{ padding: "1em" }}>
            <Typography variant="h5">{allergyList.person}</Typography>
            {allergyList.allergies.map((allergy) => (
              <AllergyChip key={allergy.name} allergy={allergy} />
            ))}
          </Card>
          <br />
        </div>
      ))}
    </div>
  );
};
