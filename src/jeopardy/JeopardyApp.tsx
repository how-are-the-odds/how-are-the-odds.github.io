import { Button, Container, Stack, TextField } from "@mui/material";
import { useState, KeyboardEvent, useRef, useEffect } from "react";
import Clue from "./Clue";
import LoginStatus from "./LoginStatus";
import { Login } from "./Login";
import { UserInfoBox } from "./UserInfoBox";

// const apiUrl = "http://127.0.0.1:5000/";
const apiUrl = "https://danielpacker.pythonanywhere.com/";

const JeopardyApp = () => {
  const maxClueQueueLength = 3;
  const [clueQueue, setClueQueue] = useState<Clue[]>([]);
  const [responseVisible, setResponseVisible] = useState(false);
  const [response, setResponse] = useState("");
  const [loginStatus, setLoginStatus] = useState<LoginStatus>({
    loggedIn: false,
    username: "",
  });
  const [loginInput, setLoginInput] = useState<string>("");

  const inputBoxRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (loginStatus.loggedIn) {
      checkUserExists(loginStatus.username);
      for (let i = 0; i < maxClueQueueLength; i++) {
        getClue(loginStatus.username);
      }
    }
  }, [loginStatus]);

  const checkUserExists = (username: string) => {
    let data = new FormData();
    data.append("username", username);
    fetch(apiUrl + "check_user", { method: "POST", body: data })
      .then((response) => response.json())
      .then((response) => {
        if (!response["user_exists"]) {
          createUser(username);
        }
      });
  };

  const createUser = (username: string) => {
    let data = new FormData();
    data.append("username", username);
    fetch(apiUrl + "create_user", { method: "POST", body: data }).then(
      (response) => console.log(response)
    );
  };
  const getClue = (username: string) => {
    let data = new FormData();
    data.append("username", username);
    if (clueQueue.length >= maxClueQueueLength) {
      setClueQueue((clueQueue) => [...clueQueue.slice(1)]);
    }
    fetch(apiUrl + "user_clue", { method: "POST", body: data })
      .then((response) => response.json())
      .then((response: Clue) => {
        console.log({ clueQueue: clueQueue });
        console.log(response);
        setClueQueue((clueQueue) => [...clueQueue, response]);
      });
  };
  const checkEnter = (e: KeyboardEvent<HTMLImageElement>) => {
    if (e.key === "Enter") {
      setResponseVisible(true);
    }
  };

  const recordResponse = (clue: Clue | undefined, correct: boolean) => {
    setResponse("");
    setResponseVisible(false);
    if (clue === undefined) {
      return;
    }
    let data = new FormData();
    data.append("username", loginStatus.username);
    data.append("clue_id", String(clue.clue_id));
    data.append("correct", String(correct));
    fetch(apiUrl + "record_user_clue", { method: "POST", body: data });
    if (inputBoxRef.current) {
      inputBoxRef.current.focus();
    }
    getClue(loginStatus.username);
  };

  const responseComponent = (response: string | undefined) => {
    return (
      <Container>
        {response}
        <br />
        Did you get it right?
        <br />
        <Button onClick={() => recordResponse(clueQueue[0], true)}>
          Yes
        </Button>{" "}
        <Button onClick={() => recordResponse(clueQueue[0], false)}>No</Button>
      </Container>
    );
  };

  return (
    <div>
      Jeopardy!{" "}
      <Button onClick={() => getClue(loginStatus.username)}>Get Clue!</Button>
      <br></br>
      <Stack>
        {loginStatus.loggedIn ? (
          <UserInfoBox
            loginStatus={loginStatus}
            setLoginStatus={setLoginStatus}
          />
        ) : (
          <Login
            setLoginInput={setLoginInput}
            loginInput={loginInput}
            setLoginStatus={setLoginStatus}
          />
        )}
        <Container>{clueQueue[0]?.category}</Container>
        <Container>{clueQueue[0]?.question}</Container>
        <Container>
          <TextField
            onKeyDown={checkEnter}
            onChange={(e) => setResponse(e.currentTarget.value ?? "")}
            value={response}
            inputRef={inputBoxRef}
          />
        </Container>
        <Container>
          {responseVisible ? responseComponent(clueQueue[0]?.response) : " "}
        </Container>
      </Stack>
      <br />
    </div>
  );
};

export default JeopardyApp;
