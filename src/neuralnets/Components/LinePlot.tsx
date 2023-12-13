import { useState } from "react";
interface LinePlotProps {
  xData: Array<number>;
  yData: Array<number>;
  x2Data: Array<number>;
  y2Data: Array<number>;
  addPoint: (coordinates: [number, number]) => void;
}

const LinePlot = ({ xData, yData, x2Data, y2Data, addPoint }: LinePlotProps) => {
  const data: [number, number][] = xData.map((x, i) => [x, yData[i]]);
  const data2: [number, number][] = x2Data.map((x, i) => [x, y2Data[i]]);

  const padding = 0;
  const width: number = 80;
  const height: number = 50;

  const xLim = [Math.min(...xData), Math.max(...xData)];
  const xRange = xLim[1] - xLim[0];
  const yLim = [Math.min(...yData), Math.max(...yData)];
  const yRange = yLim[1] - yLim[0];

  const [clickLocation, setClickLocation] = useState([0, 0]);

  const transformX = (x: number) => (x - xLim[0]) * (width / xRange);
  const transformY = (y: number) => (y - yLim[0]) * (height / yRange);

  const handleClick = (e: React.MouseEvent) => {
    const container = e.currentTarget.getBoundingClientRect();
    const xLocation =
      ((e.clientX - container.left) / (container.right - container.left)) *
      xRange;
    const yLocation =
      (((e.clientY - container.top) / (container.bottom - container.top))) *
      yRange + yLim[0];
    setClickLocation([xLocation, yLocation]);
    addPoint([xLocation, yLocation]);
  };

  const transformedData2: Array<[number, number]> = data2.map(([x, y]) => [
    transformX(x),
    transformY(y),
  ]);
  transformedData2.sort((a, b) => a[0] - b[0]);

  return (
    <svg
      onMouseDown={handleClick}
      viewBox={
        -padding.toString() +
        " " +
        -padding.toString() +
        " " +
        (width + 2 * padding).toString() +
        " " +
        (height + 2 * padding).toString()
      }
      style={{ minWidth: "60vw", maxWidth: "100vw", aspectRatio: (width/height) }}
    >
      <circle
        cx={transformX(clickLocation[0])}
        cy={transformY(clickLocation[1])}
        r="1"
        fill="lightblue"
      ></circle>
      {data.map(([x, y], i) => (
        <circle
          key={i}
          cx={transformX(x)}
          cy={transformY(y)}
          r="0.3"
          fill="black"
        ></circle>
      ))}

      {transformedData2.map(([x, y], i, arr) =>
        i != 0 ? (
          <line
            key={i + 2 * yData.length}
            x1={arr[i - 1][0]}
            y1={arr[i - 1][1]}
            x2={x}
            y2={y}
            stroke="red"
            strokeWidth={0.2}
          ></line>
        ) : (
          <></>
        )
      )}
    </svg>
  );
};

export default LinePlot;
