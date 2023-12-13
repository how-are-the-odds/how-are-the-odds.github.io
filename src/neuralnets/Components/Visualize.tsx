import { useEffect, useRef } from "react";
import { Value } from "./Micrograd";
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";

cytoscape.use(dagre);

interface VisualizeProps {
  value: Value;
}

const Visualize = ({ value }: VisualizeProps) => {
  const getChildren = (v: Value): Value[] => {
    const children = Array.from(v._prev);
    return children.concat(...children.map((c) => getChildren(c)));
  };

  const uniqueChildren = Array.from(new Set([...getChildren(value), value]));
  const valueData = uniqueChildren.map((value) => value.data);
  const valueDataMin = Math.min(...valueData);

  const rescaleQuantity = (valueData: number) =>
    2 * Math.log(valueData - valueDataMin + 2.5);

  const graphContainer = useRef(null);
  const drawGraph = () => {
    const nodes = uniqueChildren.map((c, i) => {
      return {
        data: {
          id: i,
        },
        style: {
          label: c.data.toFixed(1) + "," + c._op + "|" + c.grad.toFixed(1),
          width: rescaleQuantity(c.data),
          height: rescaleQuantity(c.data),
        },
      };
    });
    const edges = Array.prototype.concat(
      ...uniqueChildren.map((c, i) => {
        const directChildren = Array.from(c._prev);
        const js = directChildren.map((dc) =>
          uniqueChildren.findIndex((e) => e == dc)
        );
        return js.map((j) => ({
          data: {
            id: String(i) + "->" + String(j),
            source: i,
            target: j,
          },
        }));
      })
    );
    cytoscape({
      container: graphContainer.current,
      elements: [...nodes, ...edges],
      style: [
        // the stylesheet for the graph
        {
          selector: "node",
          style: {
            "background-color": "#666",
            label: "data(id)",
            width: 5,
            height: 5,
          },
        },

        {
          selector: "edge",
          style: {
            width: 1,
            "line-color": "#ccc",
            "target-arrow-color": "#ccc",
            "target-arrow-shape": "triangle",
            "curve-style": "bezier",
          },
        },
      ],
      layout: {
        name: "dagre",
      },
    });
  };

  useEffect(() => drawGraph(), [value]);

  return (
    <>
      {value.repr()}
      <br></br>
      <div
        ref={graphContainer}
        style={{ width: "80vw", height: 300, backgroundColor: "white" }}
      ></div>
    </>
  );
};

export default Visualize;
