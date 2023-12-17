import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

interface LossFunctionRadioProps {
  setLossFunction: (s: string) => void;
}

const LossFunctionRadio = ({ setLossFunction }: LossFunctionRadioProps) => (
  <FormControl>
    <FormLabel id="loss-function-label">Loss Function</FormLabel>
    <RadioGroup
      aria-labelledby="loss-function-label"
      defaultValue="mse"
      name="loss-function-label-buttons-group"
      onChange={(_e, val) => setLossFunction(val)}
    >
      <FormControlLabel value="mse" control={<Radio />} label="Mean Square Error" />
      <FormControlLabel value="mae" control={<Radio />} label="Mean Absolute Error" />
    </RadioGroup>
  </FormControl>
);

export default LossFunctionRadio;