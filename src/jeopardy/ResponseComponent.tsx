import { Container, Button } from "@mui/material";

interface ResponseComponentProps {
  response: string | undefined;
  recordResponse: (correct: boolean | "notAnswered") => void;
  requireScoring: boolean;
}

export const ResponseComponent = ({
  response,
  recordResponse,
  requireScoring,
}: ResponseComponentProps) => {
  return (
    <Container>
      {response}
      <br />
      {requireScoring ? (
        <Container>
          Did you get it right?
          <br />
          <Button onClick={() => recordResponse(true)}>Yes</Button>{" "}
          <Button onClick={() => recordResponse(false)}>No</Button>
        </Container>
      ) : (
        <Button onClick={() => recordResponse("notAnswered")}>Next clue!</Button>
      )}
    </Container>
  );
};