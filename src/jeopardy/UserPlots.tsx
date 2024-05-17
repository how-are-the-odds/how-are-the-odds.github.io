import User from "./User";
import { Container, Stack } from "@mui/material";
import { LineChart, XAxis, YAxis, Tooltip, Line, Label } from "recharts";
import useWindowDimensions from "../hooks/UseWindowDimensions";
import { useRef } from "react";

interface UserPlotsProps {
  user: User;
}

const WINNABLE = 27000;

export const UserPlots = ({ user }: UserPlotsProps) => {
  // Math.abs()
  const containerRef = useRef<HTMLHeadingElement>(null);
  const clueValueSeen = user.clueValueRecord.reduce((a, b) => a + b, 0);
  const winnings = user.winRecord.reduce((a, b) => a + b, 0);
  const winningsPerGame = (WINNABLE * winnings) / clueValueSeen;
  const { width: pageWidth } = useWindowDimensions();

  const cumulativeSum = (
    (sum) => (value: number) =>
      (sum += value)
  )(0);
  const data = user.winRecord
    .map(cumulativeSum)
    .map((value, index) => ({ index: index, value: value }));
  return (
    <Container ref={containerRef}>
      <Stack alignItems={"center"}>
        {winnings != 0 ? (
          <Container>
            Winnings per game: ${winningsPerGame.toFixed()} (
            {(clueValueSeen / WINNABLE).toFixed(2)} game-equivalents played)
            <br />
          </Container>
        ) : null}

        <LineChart
          width={containerRef?.current?.offsetWidth || pageWidth * 0.9}
          height={(containerRef?.current?.offsetWidth || pageWidth * 0.9) * 0.5}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 10 }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="index" minTickGap={50}>
            <Label value="Clue Number" offset={-10} position="insideBottom" />
          </XAxis>

          <YAxis>
            <Label
              value="Money Earned"
              angle={-90}
              offset={-0}
              position="insideLeft"
            />
          </YAxis>
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#82ca9d" dot={false} />
        </LineChart>
      </Stack>
    </Container>
  );
};
