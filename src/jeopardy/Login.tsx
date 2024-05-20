import { Container, Stack, TextField, Button } from "@mui/material";
import LoginStatus from "./LoginStatus";
import User from "./User";
import { useEffect, useRef } from "react";

interface LoginProps {
  loginInput: string;
  setLoginInput: (inp: string) => void;
  loginStatus: LoginStatus;
  setLoginStatus: (loginStatus: LoginStatus) => void;
}

export const Login = ({
  setLoginInput,
  loginInput,
  loginStatus,
  setLoginStatus,
}: LoginProps) => {
  const usernameFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (loginStatus.loggedIn) {
      usernameFieldRef.current?.focus();
    }
  }, []);
  const handleLoginClick = () => {
    const user = new User(loginInput);
    user.getDataFromServer();
    setLoginStatus({ loggedIn: true, user: user });
  };
  return (
    <Stack>
      <Container>What's your name?</Container>
      <Container>
        <TextField
          onChange={(e) => setLoginInput(e.currentTarget.value)}
          value={loginInput}
          inputRef={usernameFieldRef}
        />
      </Container>
      <Container>
        <Button onClick={handleLoginClick}>Log in</Button>
      </Container>
    </Stack>
  );
};
