import { Button, Stack, ThemeProvider } from "@mui/material";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "../index.css";
import { theme } from "../Themes";
import Footer from "../Components/Footer";

const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="banner">
        <h2 style={{ color: "white" }}>
          Nobody ever asks <em>how</em> the odds are.
        </h2>

        <Stack direction="row" spacing={4} justifyContent="center">
          <Button
            className="nav-button"
            component={Link}
            to={`baseball`}
            variant="contained"
          >
            Baseball
          </Button>
          <Button
            className="nav-button"
            component={Link}
            to={`politics`}
            variant="contained"
          >
            Politics
          </Button>
          <Button
            className="nav-button"
            component={Link}
            to={`machine-learning`}
            variant="contained"
          >
            Machine Learning
          </Button>
          <Button
            className="nav-button"
            component={Link}
            to={`blog`}
            variant="contained"
          >
            Blog
          </Button>
        </Stack>
      </div>
      <div className="content">
        <br />
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </ThemeProvider>
  );
};

export default Root;
