import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div>
      <h2>
        Nobody ever asks <em>how</em> the odds are.
      </h2>
      <Link to={`baseball`}> Baseball</Link>
      <Link to={`politics`}> Politics</Link>
      <br />
      <Outlet></Outlet>
    </div>
  );
};

export default Root;
