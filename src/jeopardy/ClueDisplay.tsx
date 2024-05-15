import { Stack, Container } from "@mui/material";
import Clue from "./Clue";

interface ClueDisplayProps {
  clue: Clue;
}

export const ClueDisplay = ({ clue }: ClueDisplayProps) => {
  if (clue === undefined) {
    return <></>;
  }
  return (
    <Stack>
      <Container maxWidth="sm">
        {clue.category} ({clue.clueValue}) [{clue.clueDate}]
      </Container>
      <Container maxWidth="sm">{clue.question}</Container>
    </Stack>
  );
};
