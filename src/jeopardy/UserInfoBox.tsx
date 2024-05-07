import { Button, Container, Stack } from "@mui/material";
import LoginStatus from "./LoginStatus";

interface UserInfoBoxProps {
  loginStatus: LoginStatus;
  setLoginStatus: (loginStatus: LoginStatus) => void;
}

export const UserInfoBox = ({
  loginStatus,
  setLoginStatus,
}: UserInfoBoxProps) => {
  const handleLogout = () => {
    setLoginStatus({ loggedIn: false, username: "" });
  };
  return (
    <Stack style={UserInfoBoxStyles}>
      <Container>Logged in as: {loginStatus.username}</Container>
      <Container>
        <Button onClick={handleLogout}>Log out</Button>
      </Container>
    </Stack>
  );
};

const UserInfoBoxStyles = {
  width: "200px",
  position: "absolute" as any,
  right: "20%",
  top: "200px",
  backgroundColor: "#ddd",
};