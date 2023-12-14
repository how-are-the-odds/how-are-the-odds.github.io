import { Stack, TextField } from "@mui/material";

interface NumericalInputProps {
  inputValue: number;
  setInputValue: (a: number) => void;
  label: string;
}

const NumericalInput = ({
  inputValue,
  setInputValue,
  label,
}: NumericalInputProps) => {
  return (
    <Stack style={{ minWidth: "4rem", maxWidth: "6rem" }} spacing = {4}>
      <span>{label}</span>
      <TextField
        id={label}
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        value={inputValue}
        onChange={(e) => {
          setInputValue(Number(e.target.value));
        }}
        variant="outlined"
      />
    </Stack>
  );
};

export default NumericalInput;
