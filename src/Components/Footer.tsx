import { Divider, Stack } from "@mui/material";
import "../index.css";
const Footer = () => (
  <Stack className="footer" alignItems={"center"} justifyContent={"center"}>
    <Divider variant="middle" sx={{ width: "80vw" }} />
    <br />
    <span>
      Made by Daniel Packer, checkout my{" "}
      <a href="https://www.asc.ohio-state.edu/packer.61/">personal website</a>{" "}
      and my <a href="https://github.com/Daniel-Packer">github</a>.
    </span>
  </Stack>
);

export default Footer;
