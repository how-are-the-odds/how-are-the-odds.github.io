import { Autocomplete, TextField } from "@mui/material";

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
        <div className="top-buffer">
          <center>
            <Autocomplete
              disablePortal
              className="auto-complete"
              id="pitcher-input"
              options={pitcherNames}
              sx={{ width: 200 }}
              onInputChange={(_event, value) => setPitcherName(value)}
              renderInput={(params) => (
                <TextField {...params} label="Pitcher" />
              )}
            />
          </center>
          <center>
            <Autocomplete
              className="auto-complete"
              disablePortal
              id="batter-input"
              options={batterNames}
              sx={{ width: 200 }}
              onInputChange={(_event, value) => setBatterName(value)}
              renderInput={(params) => <TextField {...params} label="Batter" />}
            />
          </center>
        </div>
        <span className="text-field">
          <TextField
            select
            label="Balls"
            defaultValue={0}
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
          </span>
          <span className="text-field">
          <TextField
            select
            label="Strikes"
            defaultValue={0}
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
        </span>
      </div>
    </form>
  );
};

export default StateInput;
