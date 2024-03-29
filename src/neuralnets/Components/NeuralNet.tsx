import { useEffect, useState } from "react";
import { Value, getData, linspace } from "./Micrograd";
import { useInterval } from "usehooks-ts";
import LinePlot from "./LinePlot";
import { randomUniform } from "d3";
import { Paper, Stack } from "@mui/material";

export class Neuron {
  w: Array<Value>;
  b: Value;
  nonLinearity: string;
  applyNonLinearity: (v: Value) => Value;

  constructor(nInputs: number, nonLinearity = "relu") {
    const rng = randomUniform(-1.0, 1.0);
    this.w = new Array(nInputs).fill(0).map(() => new Value(rng()));
    this.b = new Value(rng());
    this.nonLinearity = nonLinearity;
    this.applyNonLinearity = (() => {
      switch (this.nonLinearity) {
        case "relu":
          return (out: Value) => out.relu();
        case "tanh":
          return (out: Value) => out.tanh();
        case "leakyRelu":
          return (out: Value) => out.leakyRelu();
        case "mix":
          if (Math.random() > 0.5) {
            return (out: Value) => out.tanh();
          }
          return (out: Value) => out.relu();
        case "none":
          return (out: Value) => out;

        default:
          console.warn("Given non-linearity unknown, using relu");
          return (out: Value) => out.relu();
      }
    })();
  }

  call = (x: Array<Value>) => {
    const out = x
      .map((xi, i) => xi.mul(this.w[i]))
      .reduce((partialSum, xiwi) => partialSum.add(xiwi), this.b);

    return this.applyNonLinearity(out);
  };
}

export class Layer {
  neurons: Array<Neuron>;

  constructor(nInputs: number, nOutputs: number, nonLinearity = "relu") {
    this.neurons = new Array(nOutputs)
      .fill(0)
      .map(() => new Neuron(nInputs, nonLinearity));
  }

  call = (x: Array<Value>) => this.neurons.map((neuron) => neuron.call(x));

  getParams = () =>
    Array.prototype.concat(
      ...this.neurons.map((neuron) => [...neuron.w, neuron.b])
    );
}

export class MLP {
  hiddenLayers: Array<Layer>;
  inputLayer: Layer;
  outputLayer: Layer;

  constructor(
    inputSize: number,
    width: number,
    nHiddenLayers: number,
    outputSize: number,
    nonLinearity: string
  ) {
    this.inputLayer = new Layer(inputSize, width, nonLinearity);
    this.hiddenLayers = new Array(nHiddenLayers)
      .fill(0)
      .map(() => new Layer(width, width, nonLinearity));
    this.outputLayer = new Layer(width, outputSize, "none");
  }

  call = (x: Array<Value>) => {
    const firstStep = this.inputLayer.call(x);
    const penultimateStep = this.hiddenLayers.reduce(
      (previousStep, currentLayer) => currentLayer.call(previousStep),
      firstStep
    );
    const lastStep = this.outputLayer.call(penultimateStep);
    return lastStep;
  };

  getParams = () => {
    const inputLayerParams = this.inputLayer.getParams();
    const outputLayerParams = this.outputLayer.getParams();
    const hiddenLayerParams = Array.prototype.concat(
      ...this.hiddenLayers.map((hiddenLayer) => hiddenLayer.getParams())
    );

    return [...inputLayerParams, ...hiddenLayerParams, ...outputLayerParams];
  };

  updateParams = (learningRate: number) => {
    const params = this.getParams();
    params.map((param) => {
      param.data = param.data - param.grad * learningRate;
      param.grad *= 0.0;
    });
  };
}

interface NeuralNetProps {
  learningRate: number;
  delay: number;
  nonLinearity: string;
  layerWidth: number;
  nLayers: number;
  lossFunction: (x: Array<Value>, y: Array<Value>) => Value;
  poked: boolean;
  setPoked: (a: boolean) => void;
  clearData: boolean;
  setClearData: (a: boolean) => void;
  precomp: (x: Value[]) => Value[];
}

const NeuralNet = ({
  learningRate,
  delay,
  nonLinearity,
  layerWidth,
  nLayers,
  lossFunction,
  poked,
  setPoked,
  clearData,
  setClearData,
  precomp,
}: NeuralNetProps) => {
  const nSamplePoints = 30;
  const nPoints = 5;
  const xData = new Array(nPoints).fill(0).map((_val, i) => i / (nPoints - 1));
  const [net, setNet] = useState(
    new MLP(1, layerWidth, nLayers, 1, nonLinearity)
  );
  const [xPoints, setXPoints] = useState(xData.map((v) => new Value(v)));
  const [yPoints, setYPoints] = useState(
    xPoints.map((v) => new Value(Math.sin(v.data * 3) * Math.sin(v.data)))
  );
  const [x2Points, setX2Points] = useState([...linspace(Math.min(...xData), Math.max(...xData), nSamplePoints, true), ...getData(xPoints)]);
  const [fxPoints, setFxPoints] = useState(
    x2Points.map((v) => net.call([new Value(v)])[0].data)
  );

  const addPoint = (coordinates: [number, number]) => {
    if (
      xPoints.every(
        (xPoint, i) =>
          Math.pow(xPoint.data - coordinates[0], 2) +
            Math.pow(yPoints[i].data - coordinates[1], 2) >
          0.0001
      )
    ) {
      setXPoints([...xPoints, new Value(coordinates[0])]);
      setYPoints([...yPoints, new Value(coordinates[1])]);
      setX2Points([...x2Points, coordinates[0]]);
    }
  };

  useEffect(() => {
    if (clearData) {
      setXPoints([]);
      setYPoints([]);
      setX2Points([...linspace(Math.min(...xData), Math.max(...xData), nSamplePoints, true)]);
    }
    setClearData(false);
  }, [clearData]);

  useEffect(
    () => setNet(new MLP(1, layerWidth, nLayers, 1, nonLinearity)),
    [nonLinearity, layerWidth, nLayers]
  );

  useEffect(() => {
    if (poked) {
      const params = net.getParams();
      params[Math.floor(Math.random() * params.length)].data =
        Math.random() * 0.001 - 0.0005;
      setPoked(false);
    }
  }, [poked]);

  const [recordedLoss, setRecordedLoss] = useState(0);
  useInterval(() => {
    setFxPoints(
      x2Points.map((v) => net.call(precomp([new Value(v)]))[0].data)
    );
    const xPredictions = xPoints.map((xPoint) => net.call(precomp([xPoint]))[0]);
    const loss = lossFunction(xPredictions, yPoints);
    loss.backward();
    net.updateParams(learningRate);
    setRecordedLoss(loss.data);
  }, delay);

  return (
    <Stack style={{ alignItems: "center" }} spacing={2}>
      <span>
        Loss: {recordedLoss.toFixed(6)},<br /> Number of Parameters:{" "}
        {net.getParams().length},<br />
        Number of Training Data: {xPoints.length}
      </span>
      <Paper>
        <LinePlot
          xData={getData(xPoints)}
          yData={getData(yPoints)}
          x2Data={x2Points}
          y2Data={fxPoints}
          addPoint={addPoint}
        ></LinePlot>
      </Paper>
      <span>Click on the plot to add training data</span>
    </Stack>
  );
};

export default NeuralNet;
