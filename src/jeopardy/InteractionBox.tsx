import { Container, TextField } from "@mui/material";
import Clue from "./Clue";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { apiUrl } from "./ApiUrl";
import LoginStatus from "./LoginStatus";
import { ClueDisplay } from "./ClueDisplay";
import { ResponseComponent } from "./ResponseComponent";
import { Submission } from "./Submission";

interface InteractionBoxProps {
  clueQueue: Clue[];
  response: string;
  setResponse: (response: string) => void;
  loginStatus: LoginStatus;
  shortGetClue: () => void;
}

export const InteractionBox = ({
  clueQueue,
  response,
  setResponse,
  loginStatus,
  shortGetClue,
}: InteractionBoxProps) => {
  const inputBoxRef = useRef<HTMLInputElement | null>(null);
  const yesButtonRef = useRef<HTMLInputElement | null>(null);
  const [responseVisible, setResponseVisible] = useState(false);
  const [answered, setAnswered] = useState(false);
  const submitAnswer = (answered: boolean) => {
    setAnswered(answered);
    setResponseVisible(true);
  };
  const checkEnter = (e: KeyboardEvent<HTMLImageElement>) => {
    if (e.key === "Enter") {
      submitAnswer(true);
    }
  };
  const recordToServer = (clue: Clue, correct: boolean | "notAnswered") => {
    let data = new FormData();
    data.append("username", loginStatus.user?.username ?? "");
    data.append("clue_id", String(clue.clueId));
    data.append("clue_score", String(correct));
    fetch(apiUrl + "record_user_clue", { method: "POST", body: data })
      .then(() => {
        loginStatus.user?.getDataFromServer();
      });
  };

  const recordResponse = (
    clue: Clue | undefined,
    correct: boolean | "notAnswered"
  ) => {
    setResponse("");
    setResponseVisible(false);
    if (clue === undefined) {
      return;
    }

    // API calls
    recordToServer(clue, correct);
    shortGetClue();
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

  return (
    <div>
      <ClueDisplay clue={clueQueue[0]}></ClueDisplay>
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
        {responseVisible ? (
          <ResponseComponent
            response={clueQueue[0].response}
            recordResponse={(correct) => recordResponse(clueQueue[0], correct)}
            requireScoring={answered}
          ></ResponseComponent>
        ) : (
          <Submission submitAnswer={submitAnswer}></Submission>
        )}
      </Container>
    </div>
  );
};
