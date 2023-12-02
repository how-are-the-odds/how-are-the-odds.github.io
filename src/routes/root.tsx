import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div>
      <h2>
        Nobody ever asks <em>how</em> the odds are.
      </h2>

      <Button component={Link} to={`baseball`} variant="outlined">
        Baseball
      </Button>
      <Button component={Link} to={`politics`} variant="outlined">
        Politics
      </Button>

      <br />
      <Outlet></Outlet>
    </div>
  );
};

export default Root;
