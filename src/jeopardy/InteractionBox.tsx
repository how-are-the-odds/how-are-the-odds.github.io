import { Container, TextField } from "@mui/material";
import Clue from "./Clue";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { API_URL } from "./ApiUrl";
import LoginStatus from "./LoginStatus";
import { ClueDisplay } from "./ClueDisplay";
import { ResponseComponent } from "./ResponseComponent";
import { Submission } from "./Submission";
import { checkAnswer } from "./CheckAnswer";

interface InteractionBoxProps {
  clueQueue: Clue[];
  response: string;
  setResponse: (response: string) => void;
  loginStatus: LoginStatus;
  shortGetClue: () => void;
}

const RESPONSE_COLORS = {
  default: "white",
  correct: "green",
  incorrect: "red",
  notAnswered: "gray",
};

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
  const [inputAreaColor, setInputAreaColor] = useState("white");
  const submitAnswer = (answered: boolean, answer: string) => {
    // If there is no answer, don't record it if they're trying to answer
    if (answer === "" && answered) {
      return;
    }

    setAnswered(answered);
    const comparison = checkAnswer(answer, clueQueue[0].response);
    if (comparison === "correct") {
      recordResponse(clueQueue[0], true);
      return;
    }
    if (comparison === "incorrect") {
      recordResponse(clueQueue[0], false);
      return;
    }

    setResponseVisible(true);
  };
  const checkEnter = (e: KeyboardEvent<HTMLImageElement>) => {
    if (e.key === "Enter") {
      submitAnswer(true, response);
    }
  };
  const recordToServer = (clue: Clue, correct: boolean | "notAnswered") => {
    let data = new FormData();
    data.append("username", loginStatus.user?.username ?? "");
    data.append("clue_id", String(clue.clueId));
    data.append("clue_score", String(correct));
    fetch(API_URL + "record_user_clue", { method: "POST", body: data }).then(
      () => {
        loginStatus.user?.getDataFromServer();
      }
    );
  };

  const recordResponse = (
    clue: Clue | undefined,
    correct: boolean | "notAnswered"
  ) => {
    switch (correct) {
      case true:
        setInputAreaColor(RESPONSE_COLORS.correct);
        break;
      case false:
        setInputAreaColor(RESPONSE_COLORS.incorrect);
        break;
      case "notAnswered":
        setInputAreaColor(RESPONSE_COLORS.notAnswered);
        break;
    }
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
      if (inputBoxRef.current && loginStatus.loggedIn) {
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
          style={{
            backgroundColor: inputAreaColor,
            transition: "background-color 0.3s ease",
          }}
          onTransitionEnd={() => setInputAreaColor(RESPONSE_COLORS.default)}
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
          <Submission
            submitAnswer={submitAnswer}
            currentAnswer={response}
          ></Submission>
        )}
      </Container>
    </div>
  );
};
