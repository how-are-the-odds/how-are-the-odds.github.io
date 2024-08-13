import { useState } from "react";
import TrainingGame from "./TrainingGame";
import { Button } from "@mui/material";
import { startTrainingGame } from "./ApiCalls";

const GameContainer = () => {
  const [gameGoing, setGameGoing] = useState(false);
  const [interactionId, setInteractionId] = useState("");
  const userName = "test_user";
  return (
    <div>
      <h1>Game Container</h1>
      <Button
        onClick={() => {
          startTrainingGame(userName).then((response) => {
            setGameGoing(true);
            setInteractionId(response["interaction_id"]);
          });
        }}
      >
        Start Training Game
      </Button>

      {gameGoing && interactionId != "" ? (
        <TrainingGame interactionId={interactionId} activeUserName={userName} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default GameContainer;
