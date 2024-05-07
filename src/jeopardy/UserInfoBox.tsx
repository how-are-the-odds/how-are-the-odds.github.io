import { Button, Container, Stack } from "@mui/material";
import LoginStatus from "./LoginStatus";

interface UserInfoBoxProps {
  loginStatus: LoginStatus;
  setLoginStatus: (loginStatus: LoginStatus) => void;
  hitRate: number | undefined;
}

export const UserInfoBox = ({
  loginStatus,
  setLoginStatus,
  hitRate,
}: UserInfoBoxProps) => {
  const handleLogout = () => {
    setLoginStatus({ loggedIn: false, username: "" });
  };
  return (
    <Stack style={UserInfoBoxStyles}>
      <Container>Logged in as: {loginStatus.username}</Container>
      {hitRate ? (
        <Container>Current win rate: {Math.round(hitRate! * 100)}%</Container>
      ) : (
        <></>
      )}
      <Container>
        <Button onClick={handleLogout}>Log out</Button>
      </Container>
    </Stack>
  );
};

const UserInfoBoxStyles = {
  backgroundColor: "#ddd",
};
