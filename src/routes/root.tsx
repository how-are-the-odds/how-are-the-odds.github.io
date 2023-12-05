import { Button, Stack, ThemeProvider } from "@mui/material";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "../index.css";
import { theme } from "../Themes";

const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="banner">
        <h2 style={{color : "white"}}>
          Nobody ever asks <em>how</em> the odds are.
        </h2>

        {/* <div style={{ alignItems: "center" }}> */}
        <Stack
          direction="row"
          spacing={4}
          justifyContent="center"
        >
          <Button component={Link} to={`baseball`} variant="contained">
            Baseball
          </Button>
          <Button component={Link} to={`politics`} variant="contained">
            Politics
          </Button>
        </Stack>
        {/* </div> */}
      </div>
      <div>
        <br />
        <Outlet></Outlet>
      </div>
    </ThemeProvider>
  );
};

export default Root;
