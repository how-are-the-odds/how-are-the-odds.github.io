import { useRef, useState } from "react";
import { Button, Input } from "@mui/material";
import { answerQuestion, getQuestion } from "./ApiCalls";
import Clue from "./Clue";
import Bubble from "../Components/Bubble";

interface TrainingGameProps {
  interactionId: string;
  activeUserName: string;
}

const TrainingGame = ({ interactionId, activeUserName }: TrainingGameProps) => {
  const [displayedClue, setDisplayedClue] = useState<null | Clue>(null);
  const [response, setResponse] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState<null | boolean>(null);

  const handleSubmitClick = () => {
    if (!displayedClue) {
      return;
    }
    answerQuestion(
      {
        interaction_id: interactionId,
        clue_id: displayedClue?.clueId,
        response: response,
      },
      activeUserName
    ).then((response) => {
      console.log("Response submitted: ", response);
      setCorrectAnswer(response["response"]);
      setIsCorrect(response["correct"]);
      setResponse("");
      refreshQuestion();
      setTimeout(() => setIsCorrect(null), 2000);
    });
  };

  const refreshQuestion = () => {
    getQuestion(interactionId).then((serverResponse) => {
      setDisplayedClue(serverResponse);
    });
  };

  return (
    <div>
      <h1>Training Game</h1>
      <Button onClick={refreshQuestion}>Get Clue!</Button>
      <br />
      {displayedClue ? (
        <>
          {displayedClue.category}, {displayedClue.clueValue}
          <br />
          {displayedClue.question}
          <br />
          <div className="input-container">
            <Bubble isCorrect={isCorrect} correctAnswer={correctAnswer}/>
            <Input
              placeholder="Your Response"
              value={response}
              onChange={(e) => setResponse(e.target.value)}
            />
          </div>
          <br />
          <Button onClick={handleSubmitClick}>Submit</Button>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default TrainingGame;
