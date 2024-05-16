import { useRef, useEffect } from "react";
import {
  select,
  line,
  curveCardinal,
  scaleLinear,
  axisBottom,
  axisLeft,
} from "d3";
//data

interface LineChartProps {
  data: [number, number][];
}


// export const LineChart = () => {

// }

//chart component
// const LineChart = ({ data }: LineChartProps) => {
//   //refs
//   const svgRef = useRef<SVGSVGElement>(null);
//   const relativePadding = 0.1;
//   const scale = 50;

//   //draws chart
//   // useEffect(() => {
//   const svg = select(svgRef.current);

//   //scales
//   const xDataMin = Math.min(...data.map((d) => d[0]));
//   const xDataMax = Math.max(...data.map((d) => d[0]));
//   const xPadAmount = (xDataMax - xDataMin) * relativePadding;

//   const xScale = scaleLinear()
//     .domain([xDataMin - xPadAmount, xDataMax + xPadAmount])
//     .range([0, 10 * scale]);

//   const yData = data.map((d) => d[1]);
//   const yDataMax = Math.max(...yData);
//   const yDataMin = Math.min(...yData);
//   const yPadAmount = (yDataMax - yDataMin) * relativePadding;

//   const yScale = scaleLinear()
//     .domain([yDataMin - yPadAmount, yDataMax + yPadAmount])
//     .range([5 * scale, 0]);

//   //axes
//   // const xAxis = axisBottom(xScale).ticks(5);
//   // svg
//   //   .select<SVGElement>(".x-axis")
//   //   .style("transform", "translateY(100px)")
//   //   .call(xAxis as any);

//   const yAxis = axisLeft(yScale).ticks(5);
//   svg
//     // .append("g")
//     .select<SVGElement>(".y-axis")
//     .style("transform", "translateX(" + xPadAmount.toString() + "px)")
//     .call(yAxis);

//   // .select(".y-axis")
//   //   .style("transform", "translateX(0px)")
//   //   .call(yAxis as any);

//   //line generator
//   const myLine = line()
//     .x((d, i) => xScale(i))
//     .y((d) => yScale(d[1]))
//     .curve(curveCardinal);

//   //drawing the line
//   svg
//     .selectAll(".line")
//     .data([data])
//     .join("path")
//     .attr("class", "line")
//     .attr("d", myLine)
//     .attr("fill", "none")
//     .attr("stroke", "#00bfa6");
//   // }, [data]);

//   return (
//     <svg
//       viewBox={"0 0 " + (10 * scale).toString() + " " + (5 * scale).toString()}
//       width="80%"
//       ref={svgRef}
//     ></svg>
//   );
// };

// export default LineChart;
