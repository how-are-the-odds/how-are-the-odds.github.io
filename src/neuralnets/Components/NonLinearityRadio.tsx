import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

interface NonLinearityRadioProps {
  setNonLinearity: (s : string) => void;
}

const NonLinearityRadio = ({setNonLinearity} : NonLinearityRadioProps) => (
  <FormControl>
    <FormLabel id="non-linearity-label">Non-Linearity</FormLabel>
    <RadioGroup
      aria-labelledby="non-linearity-label"
      defaultValue="tanh"
      name="non-linearity-buttons-group"
      onChange={(_e, val) => setNonLinearity(val)}
    >
      <FormControlLabel value="tanh" control={<Radio />} label="tanh" />
      <FormControlLabel value="relu" control={<Radio />} label="ReLU" />
      <FormControlLabel value="none" control={<Radio />} label="none" />
    </RadioGroup>
  </FormControl>
);

export default NonLinearityRadio