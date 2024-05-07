import { Container, Stack, TextField, Button } from "@mui/material";
import LoginStatus from "./LoginStatus";

interface LoginProps {
  loginInput: string;
  setLoginInput: (inp: string) => void;
  setLoginStatus: (loginStatus: LoginStatus) => void;
}

export const Login = ({
  setLoginInput,
  loginInput,
  setLoginStatus,
}: LoginProps) => {
  const handleLoginClick = () => {
    setLoginStatus({loggedIn: true, username: loginInput})
  };
  return (
    <Stack>
      <Container>What's your name?</Container>
      <Container>
        <TextField
          onChange={(e) => setLoginInput(e.currentTarget.value)}
          value={loginInput}
        />
      </Container>
      <Container>
        <Button onClick={handleLoginClick}>Log in</Button>
      </Container>
    </Stack>
  );
};
