import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { nameConverter } from "../ProbabilityCompute";

interface StatsTableProps {
  probabilityArray: number[][];
  header: string[];
}

const StatsTable = ({ probabilityArray, header }: StatsTableProps) => {
  const startColor = [100, 150, 200];
  const endColor = [200, 150, 100];

  const computeColor = (numMatrix: number[][]) => {
    const maxVal = Math.max(...numMatrix.map((row) => Math.max(...row)));
    const minVal = Math.min(...numMatrix.map((row) => Math.min(...row)));
    const recenteredAndScaledMatrix = numMatrix.map((row) =>
      row.map((elem) => (elem - minVal) / (maxVal - minVal))
    );

    const colorMatrix = recenteredAndScaledMatrix.map((row) =>
      row.map(
        (elem) =>
          "rgb(" +
          (startColor[0] * (1 - elem) + endColor[0] * elem) +
          "," +
          (startColor[1] * (1 - elem) + endColor[1] * elem) +
          "," +
          (startColor[2] * (1 - elem) + endColor[2] * elem) +
          ")"
      )
    );
    return colorMatrix;
  };

  const colorMat = computeColor(probabilityArray);

  return (
    <TableContainer component={Paper} sx={{maxWidth: 800, margin: "auto"}}>
      <Table sx={{ maxWidth: 800 }}>
        <TableHead>
          <TableRow>
            {header.map((entry) => (
              <TableCell key={entry} style={{ color: "black" }}>
                {nameConverter.get(entry)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {probabilityArray.map((numArray: number[], numRow: number) => (
            <TableRow key={numRow}>
              {numArray.map((num: number, numCol: number) => (
                <TableCell
                  key={numCol}
                  style={{
                    backgroundColor: colorMat[numRow][numCol],
                    color: "white",
                  }}
                >
                  {Math.round(num * 1000) / 10}%
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StatsTable;
