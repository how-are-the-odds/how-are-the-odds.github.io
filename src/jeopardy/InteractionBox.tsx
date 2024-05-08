import { Container, TextField, Button } from "@mui/material";
import Clue from "./Clue";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { apiUrl } from "./Apiurl";
import LoginStatus from "./LoginStatus";
import { ClueDisplay } from "./ClueDisplay";

interface InteractionBoxProps {
  clueQueue: Clue[];
  response: string;
  setResponse: (response: string) => void;
  loginStatus: LoginStatus;
  getClue: (username: string) => void;
  setHitRate: (hitRate: number | undefined) => void;
  setAveragePointsEarned: (averagePointsEarned: number | undefined) => void;
}

export const InteractionBox = ({
  clueQueue,
  response,
  setResponse,
  loginStatus,
  getClue,
  setHitRate,
  setAveragePointsEarned,
}: InteractionBoxProps) => {
  const inputBoxRef = useRef<HTMLInputElement | null>(null);
  const yesButtonRef = useRef<HTMLInputElement | null>(null);
  const [responseVisible, setResponseVisible] = useState(false);
  const submitAnswer = () => {
    setResponseVisible(true);
  };
  const checkEnter = (e: KeyboardEvent<HTMLImageElement>) => {
    if (e.key === "Enter") {
      submitAnswer();
    }
  };
  const recordToServer = (clue: Clue, correct: boolean) => {
    let data = new FormData();
    data.append("username", loginStatus.username);
    data.append("clue_id", String(clue.clueId));
    data.append("correct", String(correct));
    fetch(apiUrl + "record_user_clue", { method: "POST", body: data })
      .then((response) => response.json())
      .then((response) => {
        setHitRate(response["hit_rate"]);
        setAveragePointsEarned(response["average_points_earned"]);
      });
  };
  const recordResponse = (clue: Clue | undefined, correct: boolean) => {
    setResponse("");
    setResponseVisible(false);
    if (clue === undefined) {
      return;
    }

    // API calls
    recordToServer(clue, correct);
    getClue(loginStatus.username);
  };

  useEffect(() => {
    if (!responseVisible) {
      if (inputBoxRef.current) {
        inputBoxRef.current.focus();
      }
    } else {
      if (yesButtonRef.current) {
        yesButtonRef.current.focus();
      }
    }
  }, [responseVisible]);

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
      <ClueDisplay clue={clueQueue[0]}></ClueDisplay>
      {/* <Container>{clueQueue[0]?.category}</Container> */}
      <Container>
        <TextField
          onKeyDown={checkEnter}
          onChange={(e) => setResponse(e.currentTarget.value ?? "")}
          value={response}
          inputRef={inputBoxRef}
          disabled={responseVisible}
        />
      </Container>
      <Container>
        <Button onClick={submitAnswer}>Submit</Button>
      </Container>
      <Container>
        {responseVisible ? responseComponent(clueQueue[0]?.response) : " "}
      </Container>
    </div>
  );
};
