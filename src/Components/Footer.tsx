import { Divider, Stack, Tooltip } from "@mui/material";
import "../index.css";
const Footer = () => (
  <Stack className="footer" alignItems={"center"} justifyContent={"center"}>
    <Divider variant="middle" sx={{ width: "80vw" }} />
    <br />
    <span>
      Made by Daniel Packer, check out my{" "}
      <a href="https://www.asc.ohio-state.edu/packer.61/">personal website</a>{" "}
      and my <a href="https://github.com/Daniel-Packer">github</a>.
    </span>
    <br/>
    <span>
      Contact me at <Tooltip title="Fill in with {Daniel} and {Packer} respectively."><span>{"{My first name}.the.{My last name}@gmail.com"}</span></Tooltip>
    </span>
  </Stack>
);

export default Footer;
