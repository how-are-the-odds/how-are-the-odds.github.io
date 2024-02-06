import * as d3 from "d3";
import { useEffect } from "react";
interface ScatterPlot3dProps {}

const ScatterPlot3d = ({}: ScatterPlot3dProps) => {
  useEffect(() => {
    d3.csv(
      "https://raw.githubusercontent.com/Daniel-Packer/ny_education_2/main/outputs/pca_exposure_matrices.csv"
    ).then((csvData) => {
      const svg = d3
        .select("#scatterplot")
        .append("svg")
        .attr("width", 500)
        .attr("height", 500);
      console.log(csvData);
      const x = d3.scaleLinear().domain([-2, 2]).range([0, 500]);
      svg
        .append("g")
        .attr("transform", `translate(0, ${500})`)
        .call(d3.axisBottom(x));

      // Add Y axis
      const y = d3.scaleLinear().domain([-2, 2]).range([500, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Add dots
      svg
        .append("g")
        .selectAll("circle")
        .data(csvData)
        .join("circle")
        .attr("cx", function (d) {
          return x(Number(d["component 2"]));
        })
        .attr("cy", function (d) {
          return y(Number(d["component 3"]));
        })
        .attr("r", 2);
    });
  }, []);

  return <div id="scatterplot"></div>;
};

export default ScatterPlot3d;
