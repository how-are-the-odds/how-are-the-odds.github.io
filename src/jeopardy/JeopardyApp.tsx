import { Container, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import Clue from "./Clue";
import LoginStatus from "./LoginStatus";
import { Login } from "./Login";
import { UserInfoBox } from "./UserInfoBox";
import { InteractionBox } from "./InteractionBox";
import { apiUrl } from "./Apiurl";
import { checkUserExists } from "./ApiCalls";
import { ClueDisplay } from "./ClueDisplay";

const JeopardyApp = () => {
  const maxClueQueueLength = 2;
  const [clueQueue, setClueQueue] = useState<Clue[]>([]);
  const [response, setResponse] = useState("");
  const [loginStatus, setLoginStatus] = useState<LoginStatus>({
    loggedIn: false,
    username: "",
  });
  const [loginInput, setLoginInput] = useState<string>("");
  const [hitRate, setHitRate] = useState<number | undefined>(undefined);
  const [averagePointsEarned, setAveragePointsEarned] = useState<
    number | undefined
  >(undefined);

  useEffect(() => {
    if (loginStatus.loggedIn) {
      checkUserExists(loginStatus.username).then(() => {
        for (let i = 0; i < maxClueQueueLength; i++) {
          getClue(loginStatus.username);
        }
      });
    }
  }, [loginStatus]);

  const getClue = (username: string) => {
    let data = new FormData();
    data.append("username", username);
    if (clueQueue.length >= maxClueQueueLength) {
      setClueQueue((clueQueue) => [...clueQueue.slice(1)]);
    }
    fetch(apiUrl + "user_clue", { method: "POST", body: data })
      .then((response) => response.json())
      .then((response: Clue) => {
        setClueQueue((clueQueue) => [...clueQueue, response]);
      });
  };
  return (
    <div>
      <Stack>
        <Container maxWidth="sm">
          {loginStatus.loggedIn ? (
            <UserInfoBox
              loginStatus={loginStatus}
              setLoginStatus={setLoginStatus}
              hitRate={hitRate}
              averagePointsEarned={averagePointsEarned}
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
          getClue={getClue}
          setHitRate={setHitRate}
          setAveragePointsEarned={setAveragePointsEarned}
        />
      </Stack>
      <br />
    </div>
  );
};

export default JeopardyApp;
