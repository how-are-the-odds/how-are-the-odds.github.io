import { Divider, Stack } from "@mui/material";
import Introduction from "./Components/Introduction";
import Micrograd from "./Components/Micrograd";

const MicrogradApp = () => {
  return (
    <Stack sx={{ alignItems: "center" }} spacing={4}>
      <Introduction />
      <Divider variant="middle" sx={{ width: "80vw" }} />
      <Micrograd />
    </Stack>
  );
};

export default MicrogradApp;
