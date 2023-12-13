import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import Introduction from "./Components/Introduction";
import { Outlet, useNavigate } from "react-router-dom";

const BaseBallPage = () => {
  const navigate = useNavigate();
  return (
    <Stack spacing={8} alignItems="center">
      <Introduction></Introduction>
      <RadioGroup
        aria-labelledby="baseball-radio-buttons-group-label"
        defaultValue="predictor"
        name="baseball-radio-buttons-group"
        row
      >
        <FormControlLabel value="predictor" control={<Radio />} onClick={() => navigate("./predictor")} label="The Predictor" />
        <FormControlLabel value="documentation" control={<Radio />} onClick={() => navigate("./documentation")} label="Documentation" />
      </RadioGroup>
      <Outlet></Outlet>
    </Stack>
  );
};

export default BaseBallPage;
