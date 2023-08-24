import { Autocomplete, TextField } from "@mui/material";

interface StateInputProps {
  pitcherNames: string[];
  batterNames: string[];
  pitcherName: string;
  setPitcherName: (a: string) => void;
  batterName: string;
  setBatterName: (a: string) => void;
  count: number[];
  setCount: (n: number[]) => void;
}

const balls = [0, 1, 2, 3];
const strikes = [0, 1, 2];

const StateInput = ({
  pitcherNames,
  batterNames,
  batterName,
  setBatterName,
  pitcherName,
  setPitcherName,
  setCount,
  count,
}: StateInputProps) => {
  return (
    <form>
      <div className="container">
        <div className="row top-buffer">
          <div className="col-sm-4">
            <center>
              <Autocomplete
                disablePortal
                id="pitcher-input"
                options={[...pitcherNames, ""]}
                value={pitcherName}
                sx={{ width: 200 }}
                onInputChange={(_event, value) => setPitcherName(value)}
                renderInput={(params) => (
                  <TextField {...params} label="Pitcher" />
                )}
              />
            </center>
          </div>
          <div className="col-sm-4">
            <center>
              <Autocomplete
                disablePortal
                id="batter-input"
                options={[...batterNames, ""]}
                value={batterName}
                sx={{ width: 200 }}
                onInputChange={(_event, value) => setBatterName(value)}
                renderInput={(params) => (
                  <TextField {...params} label="Batter" />
                )}
              />
            </center>
          </div>
        </div>
        <div className="row top-buffer">
          <div className="col-sm-4">
            <TextField
              id="outlined-select-currency-native"
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
          </div>
          <div className="col-sm-4">
            <TextField
              id="outlined-select-currency-native"
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
          </div>
        </div>
      </div>
    </form>
  );
};

export default StateInput;
