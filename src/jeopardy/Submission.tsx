import { Container, Button } from "@mui/material";

interface SubmissionProps {
  submitAnswer: (answered: boolean, answer: string) => void;
  currentAnswer: string;
}

export const Submission = ({
  submitAnswer,
  currentAnswer,
}: SubmissionProps) => {
  return (
    <Container>
      <Button onClick={() => submitAnswer(true, currentAnswer)}>Answer</Button>
      <Button onClick={() => submitAnswer(false, "")}>I don't know</Button>
    </Container>
  );
};
