import { Container, Button } from "@mui/material";

interface SubmissionProps {
  submitAnswer: (answered: boolean) => void;
}

export const Submission = ({submitAnswer} : SubmissionProps) => {

  return (
    <Container>
      <Button onClick={() => submitAnswer(true)}>Answer</Button>
      <Button onClick={() => submitAnswer(false)}>I don't know</Button>
    </Container>
  );
};
