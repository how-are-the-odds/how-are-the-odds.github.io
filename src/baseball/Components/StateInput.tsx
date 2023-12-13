import { Autocomplete, Stack, TextField } from "@mui/material";

interface StateInputProps {
  pitcherNames: string[];
  batterNames: string[];
  setPitcherName: (a: string) => void;
  setBatterName: (a: string) => void;
  count: number[];
  setCount: (n: number[]) => void;
}

const balls = [0, 1, 2, 3];
const strikes = [0, 1, 2];

const capitalize = (name: string) =>
  name
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .reduce((sentence, word) => sentence + word + " ", "")
    .trim();

const StateInput = ({
  pitcherNames,
  batterNames,
  setBatterName,
  setPitcherName,
  setCount,
  count,
}: StateInputProps) => {
  return (
    <form>
      <div className="container">
        <Stack
          direction="row"
          spacing={4}
          flexWrap="wrap"
          justifyContent={"center"}
        >
          <Autocomplete
            className="auto-complete"
            id="pitcher-input"
            options={pitcherNames}
            getOptionLabel={capitalize}
            sx={{ width: "30vw", maxWidth: 250, minWidth: 160 }}
            onInputChange={(_event, value) => setPitcherName(value)}
            renderInput={(params) => (
              <TextField {...params} label="Pitcher" variant="filled" />
            )}
          />
          <Autocomplete
            className="auto-complete"
            id="batter-input"
            options={batterNames}
            getOptionLabel={capitalize}
            sx={{ width: "30vw", maxWidth: 250, minWidth: 160 }}
            onInputChange={(_event, value) => setBatterName(value)}
            renderInput={(params) => (
              <TextField {...params} label="Batter" variant="filled" />
            )}
          />
        </Stack>
        <Stack
          direction="row"
          spacing={4}
          flexWrap="wrap"
          justifyContent={"center"}
        >
          <TextField
            select
            variant="filled"
            label="Balls"
            defaultValue={0}
            sx={{ width: "10vw", maxWidth: 85, minWidth: 55 }}
            onChange={(event) => {
              setCount([parseInt(event.target.value), count[1]]);
            }}
            SelectProps={{
              native: true,
            }}
          >
            {balls.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </TextField>
          <TextField
            select
            variant="filled"
            label="Strikes"
            defaultValue={0}
            sx={{ width: "10vw", maxWidth: 85, minWidth: 55 }}
            onChange={(event) => {
              setCount([count[1], parseInt(event.target.value)]);
            }}
            SelectProps={{
              native: true,
            }}
          >
            {strikes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </TextField>
        </Stack>
      </div>
    </form>
  );
};

export default StateInput;
