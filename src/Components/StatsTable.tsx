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
    <div className="table-responsive table-fixed">
      <table className="table table-bordered rounded">
        <thead>
          <tr>
            {header.map((entry) => (
              <th key={entry}>{nameConverter.get(entry)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {probabilityArray.map((numArray: number[], numRow: number) => (
            <tr key={numRow}>
              {numArray.map((num: number, numCol: number) => (
                <td
                  key={numCol}
                  style={{
                    backgroundColor: colorMat[numRow][numCol],
                    color: "white",
                  }}
                >
                  {Math.round(num * 1000) / 10}%
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatsTable;
