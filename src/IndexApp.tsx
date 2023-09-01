import { Button } from "@mui/material";
import NavBar from "./Components/NavBar";

const IndexApp = () => {
  const makeRequest = () => {
    fetch("http://danielpacker.pythonanywhere.com/api/add_numbers", {
      method: "POST",
      mode: "cors",
      credentials: "omit",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([1, 2]),
    }).then((response) => console.log(response));
  };
  return (
    <>
      <NavBar></NavBar>
      <Button onClick={makeRequest}>Click me?</Button>
    </>
  );
};

export default IndexApp;
