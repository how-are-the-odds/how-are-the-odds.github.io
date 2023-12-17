import { Button, Stack, Tooltip } from "@mui/material";
import NeuralNet from "./NeuralNet";
import LearningRateSlider from "./LearningRateSlider";
import NonLinearityRadio from "./NonLinearityRadio";
import NumericalInput from "./NumericalInput";
import { useState } from "react";
import PrecompRadio from "./PrecompRadio";
import LossFunctionRadio from "./LossFunctionRadio";

const topologicalSort = (vInit: Value) => {
  const topo: Array<Value> = [];
  const visited: Set<Value> = new Set();

  const buildTopo = (v: Value) => {
    if (!visited.has(v)) {
      visited.add(v);
      v._prev.forEach((child) => buildTopo(child));
      topo.push(v);
    }
  };

  buildTopo(vInit);
  return topo;
};

export class Value {
  data: number;
  _prev: Set<Value>;
  _op: string;
  label: string;
  grad: number;
  _backward: () => void;
  constructor(
    data: number,
    label = "",
    _children: Value[] = [],
    _op = "",
    grad = 0
  ) {
    this.data = data;
    this._prev = new Set(_children);
    this._op = _op;
    this.label = label;
    this.grad = grad;
    this._backward = () => {};
  }

  repr = () => "Value(" + this.data.toString() + ")";

  backward = () => {
    const orderedNodes = topologicalSort(this).reverse();
    orderedNodes[0].grad = 1.0;
    for (const node of orderedNodes) {
      node._backward();
    }
  };

  add = (other: Value) => {
    const out = new Value(this.data + other.data, "+", [this, other], "+");
    const _backward = () => {
      this.grad += 1.0 * out.grad;
      other.grad += 1.0 * out.grad;
    };

    out._backward = _backward;

    return out;
  };
  sub = (other: Value) => {
    const out = new Value(this.data - other.data, "-", [this, other], "-");

    const _backward = () => {
      this.grad += 1.0 * out.grad;
      other.grad += -1.0 * out.grad;
    };
    out._backward = _backward;

    return out;
  };
  mul = (other: Value) => {
    const out = new Value(this.data * other.data, "*", [this, other], "*");

    const _backward = () => {
      this.grad += other.data * out.grad;
      other.grad += this.data * out.grad;
    };
    out._backward = _backward;

    return out;
  };

  abs = () => {
    const out = new Value(Math.abs(this.data), "abs", [this], "abs");

    const _backward = () => {
      this.grad += this.data > 0 ? out.grad : -out.grad;
    };
    out._backward = _backward;

    return out;
  }

  relu = () => {
    const out = new Value(
      this.data >= 0.0 ? this.data : 0.0,
      "relu",
      [this],
      "relu"
    );

    const _backward = () => {
      this.grad += this.data >= 0 ? out.grad : 0.0;
    };
    out._backward = _backward;

    return out;
  };

  tanh = () => {
    const out = new Value(Math.tanh(this.data), "tanh", [this], "tanh");

    const _backward = () => {
      const t = Math.tanh(this.data);
      this.grad += (1 - t * t) * out.grad;
    };
    out._backward = _backward;

    return out;
  };

  leakyRelu = () => {
    const out = new Value(
      this.data >= 0.0 ? this.data : 0.01 * this.data,
      "leakyRelu",
      [this],
      "leakyRelu"
    );

    const _backward = () => {
      this.grad += this.data >= 0 ? out.grad : 0.01 * out.grad;
    };
    out._backward = _backward;

    return out;
  }

  getGrad = () => {};
}

export const linspace = (
  start: number,
  stop: number,
  num: number = 50,
  endpoint = true
) => {
  const div = endpoint ? num - 1 : num;
  const step = (stop - start) / div;
  return Array.from({ length: num }, (_, i) => start + step * i);
};

export const getData = (values: Value[]) => values.map((v) => v.data);

export const logit = (x: Array<Value>) =>
  x.map((xi) => new Value(Math.log((xi.data + 0.01) / (1.01 - xi.data))));

export const meanSquareLoss = (x: Array<Value>, y: Array<Value>) => {
  const sumSquareLoss = x.reduce((previousValue, xi, i) => {
    const error = xi.sub(y[i]);
    return previousValue.add(error.mul(error));
  }, new Value(0));
  return sumSquareLoss.mul(new Value(1 / x.length));
}

export const meanAbsoluteLoss = (x: Array<Value>, y: Array<Value>) => {
  const sumAbsoluteLoss = x.reduce((previousValue, xi, i) => {
    const error = xi.sub(y[i]);
    return previousValue.add(error.abs());
  }, new Value(0));
  return sumAbsoluteLoss.mul(new Value(1 / x.length));
}

const Micrograd = () => {
  const [learningRate, setLearningRate] = useState(0.05);
  const [nonLinearity, setNonLinearity] = useState("tanh");
  const [layerWidth, setLayerWidth] = useState(4);
  const [numLayers, setNumLayers] = useState(1);
  const [updateDelay, setUpdateDelay] = useState(10);
  const [poked, setPoked] = useState(false);
  const [clearData, setClearData] = useState(false);
  const [precomp, setPrecomp] = useState("logit");
  const [lossFunction, setLossFunction] = useState("mse");

  const precompFunctionDict: { [key: string]: (x: Value[]) => Value[] } = {
    logit: logit,
    none: (x: Value[]) => x,
  };
  const lossFunctionDict: { [key: string]: (x: Value[], y: Value[]) => Value } =
    {
      mse: meanSquareLoss,
      mae: meanAbsoluteLoss,
    };

  const poke = () => {
    setPoked(true);
  };

  const clearTrainingData = () => setClearData(true);

  return (
    <Stack
      style={{ alignItems: "top", width: "70%", margin: "auto" }}
      spacing={6}
    >
      <NeuralNet
        learningRate={learningRate}
        delay={updateDelay}
        nonLinearity={nonLinearity}
        layerWidth={layerWidth}
        nLayers={numLayers}
        lossFunction={lossFunctionDict[lossFunction]}
        poked={poked}
        setPoked={setPoked}
        clearData={clearData}
        setClearData={setClearData}
        precomp={precompFunctionDict[precomp]}
      ></NeuralNet>
      <Stack
        direction="row"
        spacing={16}
        alignItems={"center"}
        useFlexGap
        flexWrap="wrap"
      >
        <Stack spacing={4}>
          <Button onClick={clearTrainingData} variant="contained">Clear Training Data</Button>
          <Tooltip title="Set a random parameter to near-zero">
            <Button onClick={poke} variant="contained">
              Poke
            </Button>
          </Tooltip>
        </Stack>
        <NumericalInput
          inputValue={layerWidth}
          setInputValue={setLayerWidth}
          label={"Layer Width"}
        />
        <NumericalInput
          inputValue={numLayers}
          setInputValue={setNumLayers}
          label={"Number of Layers"}
        />
        <NumericalInput
          inputValue={updateDelay}
          setInputValue={setUpdateDelay}
          label={"Update Delay (ms)"}
        />
        <PrecompRadio setPrecomp={setPrecomp} />
        <LossFunctionRadio setLossFunction={setLossFunction} />
        <NonLinearityRadio setNonLinearity={setNonLinearity} />
        <LearningRateSlider
          learningRate={learningRate}
          setLearningRate={setLearningRate}
        />
      </Stack>
    </Stack>
  );
};

export default Micrograd;
