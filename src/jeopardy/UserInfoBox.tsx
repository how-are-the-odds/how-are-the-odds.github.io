import { Button, Container, Stack } from "@mui/material";
import LoginStatus from "./LoginStatus";
import { ControlsBox } from "./ControlsBox";
import { Dispatch, SetStateAction } from "react";

interface UserInfoBoxProps {
  loginStatus: LoginStatus;
  setLoginStatus: (loginStatus: LoginStatus) => void;
  beta: number,
  setBeta: Dispatch<SetStateAction<number>>;
}

export const UserInfoBox = ({
  loginStatus,
  setLoginStatus,
  beta,
  setBeta,
}: UserInfoBoxProps) => {
  const handleLogout = () => {
    setLoginStatus({ loggedIn: false, user: null });
  };
  return (
    <Stack style={UserInfoBoxStyles}>
      <Container>Logged in as: {loginStatus.user?.username}</Container>
      {(loginStatus.user?.hitRate !== undefined) ? (
        <Container>
          {Math.round(loginStatus.user.hitRate * 100)}% of questions answered correctly
        </Container>
      ) : (
        <></>
      )}
      {loginStatus.user?.averagePointsEarned ? (
        <Container>
          Average points earned per clue: {Math.round(loginStatus.user.averagePointsEarned)}
        </Container>
      ) : (
        <></>
      )}
      <Container maxWidth="xs">
        <ControlsBox beta={beta} setBeta={setBeta}></ControlsBox>
      </Container>
      <Container>
        <Button onClick={handleLogout}>Log out</Button>
      </Container>
    </Stack>
  );
};

const UserInfoBoxStyles = {
  backgroundColor: "#ddd",
};
