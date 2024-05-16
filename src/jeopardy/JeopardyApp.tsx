import { Container, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import Clue from "./Clue";
import LoginStatus from "./LoginStatus";
import { Login } from "./Login";
import { UserInfoBox } from "./UserInfoBox";
import { InteractionBox } from "./InteractionBox";
import { checkUserExists, getClue } from "./ApiCalls";
import { UserPlots } from "./UserPlots";

const JeopardyApp = () => {
  const maxClueQueueLength = 2;
  const [clueQueue, setClueQueue] = useState<Clue[]>([]);
  const [response, setResponse] = useState("");
  const [loginStatus, setLoginStatus] = useState<LoginStatus>({
    loggedIn: false,
    user: null,
  });
  const [loginInput, setLoginInput] = useState<string>("");
  const [beta, setBeta] = useState(0);

  const shortGetClue = () =>
    getClue(
      loginStatus.user?.username ?? "",
      clueQueue,
      setClueQueue,
      maxClueQueueLength,
      beta
    );

  useEffect(() => {
    if (loginStatus.loggedIn) {
      checkUserExists(loginStatus.user?.username ?? "").then(() => {
        for (let i = 0; i < maxClueQueueLength; i++) {
          shortGetClue();
        }
      });
    }
  }, [loginStatus]);

  return (
    <div>
      <Stack>
        <Container maxWidth="sm">
          {loginStatus.loggedIn ? (
            <UserInfoBox
              loginStatus={loginStatus}
              setLoginStatus={setLoginStatus}
              beta={beta}
              setBeta={setBeta}
            />
          ) : (
            <Login
              setLoginInput={setLoginInput}
              loginInput={loginInput}
              setLoginStatus={setLoginStatus}
            />
          )}
        </Container>
        <InteractionBox
          clueQueue={clueQueue}
          response={response}
          setResponse={setResponse}
          loginStatus={loginStatus}
          shortGetClue={shortGetClue}
        />
        {loginStatus.user ? <UserPlots user={loginStatus.user} /> : null}
      </Stack>
      <br />
    </div>
  );
};

export default JeopardyApp;
