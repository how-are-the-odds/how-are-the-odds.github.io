import { useState } from "react";
interface LinePlotProps {
  xData: Array<number>;
  yData: Array<number>;
  x2Data: Array<number>;
  y2Data: Array<number>;
  addPoint: (coordinates: [number, number]) => void;
}

const LinePlot = ({
  xData,
  yData,
  x2Data,
  y2Data,
  addPoint,
}: LinePlotProps) => {
  const data: [number, number][] = xData.map((x, i) => [x, yData[i]]);
  const data2: [number, number][] = x2Data.map((x, i) => [x, y2Data[i]]);

  const horizontalPadding: number = 0.05;
  const verticalPadding: number = 0.05;
  const width: number = 80;
  const height: number = 50;

  // const xLim = [Math.min(...xData) - horizontalPadding, Math.max(...xData) + horizontalPadding];
  const xLim = [0 - horizontalPadding, 1 + horizontalPadding];
  const xRange = xLim[1] - xLim[0];
  // const yLim = [Math.min(...yData) - verticalPadding, Math.max(...yData) + verticalPadding];
  const yLim = [-0.3 - verticalPadding, 0.75 + verticalPadding];
  const yRange = yLim[1] - yLim[0];

  const [clickLocation, setClickLocation] = useState([0, 0]);

  const transformX = (x: number) => (x - xLim[0]) * (width / xRange);
  const transformY = (y: number) => (y - yLim[0]) * (height / yRange);

  const handleClick = (e: React.MouseEvent) => {
    const container = e.currentTarget.getBoundingClientRect();
    const xLocation =
      ((e.clientX - container.left) / (container.right - container.left)) *
        xRange +
      xLim[0];
    const yLocation =
      ((e.clientY - container.top) / (container.bottom - container.top)) *
        yRange +
      yLim[0];
    if (xLocation > (xLim[1] - horizontalPadding) || xLocation < (xLim[0] + horizontalPadding)) return;
    if (yLocation > (yLim[1] - verticalPadding) || yLocation < (yLim[0] + verticalPadding)) return;
    setClickLocation([xLocation, yLocation]);
    addPoint([xLocation, yLocation]);
    console.log(clickLocation)
  };

  const transformedData2: Array<[number, number]> = data2.map(([x, y]) => [
    transformX(x),
    transformY(y),
  ]);
  transformedData2.sort((a, b) => a[0] - b[0]);

  return (
    <svg
      onMouseDown={handleClick}
      viewBox={"0 0 " + width.toString() + " " + height.toString()}
      style={{
        minWidth: "60vw",
        maxWidth: "100vw",
        aspectRatio: width / height,
      }}
    >
      <circle
        key={"click-circle"}
        cx={transformX(clickLocation[0])}
        cy={transformY(clickLocation[1])}
        r="1"
        fill="lightblue"
      ></circle>
      {data.map(([x, y], i) => (
        <circle
          key={"trainingdata" + i.toString()}
          cx={transformX(x)}
          cy={transformY(y)}
          r="0.3"
          fill="black"
        ></circle>
      ))}

      {transformedData2.map(([x, y], i, arr) =>
        i != 0 ? (
          <line
            key={"line" + i.toString() + "to" + (i - 1).toString()}
            x1={arr[i - 1][0]}
            y1={arr[i - 1][1]}
            x2={x}
            y2={y}
            stroke="red"
            strokeWidth={0.2}
          ></line>
        ) : (
          <div key={"empty spot"}></div>
        )
      )}
    </svg>
  );
};

export default LinePlot;
