import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

interface PrecompRadioProps {
  setPrecomp: (s: string) => void;
}

const PrecompRadio = ({ setPrecomp }: PrecompRadioProps) => (
  <FormControl>
    <FormLabel id="precomp-label">Precomposition</FormLabel>
    <RadioGroup
      aria-labelledby="precomp-label"
      defaultValue="logit"
      name="precomp-label-buttons-group"
      onChange={(_e, val) => setPrecomp(val)}
    >
      <FormControlLabel value="logit" control={<Radio />} label="logit" />
      <FormControlLabel value="none" control={<Radio />} label="none" />
    </RadioGroup>
  </FormControl>
);

export default PrecompRadio;
