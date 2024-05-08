import { Button, Container, Stack } from "@mui/material";
import LoginStatus from "./LoginStatus";

interface UserInfoBoxProps {
  loginStatus: LoginStatus;
  setLoginStatus: (loginStatus: LoginStatus) => void;
  hitRate: number | undefined;
  averagePointsEarned: number | undefined;
}

export const UserInfoBox = ({
  loginStatus,
  setLoginStatus,
  hitRate,
  averagePointsEarned,
}: UserInfoBoxProps) => {
  const handleLogout = () => {
    setLoginStatus({ loggedIn: false, username: "" });
  };
  return (
    <Stack style={UserInfoBoxStyles}>
      <Container>Logged in as: {loginStatus.username}</Container>
      {(hitRate !== undefined) ? (
        <Container>
          {Math.round(hitRate! * 100)}% of questions answered correctly
        </Container>
      ) : (
        <></>
      )}
      {averagePointsEarned ? (
        <Container>
          Average points earned per clue: {Math.round(averagePointsEarned)}
        </Container>
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
