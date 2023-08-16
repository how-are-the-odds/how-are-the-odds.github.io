import { useEffect, useState } from "react";
import "./App.css";
import StatsTable from "./Components/StatsTable";
import { eventOrder, softmax } from "./ProbabilityCompute";
import StateInput from "./Components/StateInput";

function App() {
  const [probabilityArray, setProbabilityArray] = useState<number[][]>([]);
  const [batterData, setBatterData] = useState<{
    [key: string]: { [key: string]: number };
  }>({});
  const [pitcherData, setPitcherData] = useState<{
    [key: string]: { [key: string]: number };
  }>({});
  const [batterNames, setBatterNames] = useState<string[]>([]);
  const [pitcherNames, setPitcherNames] = useState<string[]>([]);

  const [countOffset, setCountOffset] = useState<{
    [ball: number]: { [strike: number]: number[] };
  }>({});
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [pitcherName, setPitcherName] = useState("");
  const [batterName, setBatterName] = useState("");
  const [count, setCount] = useState([0, 0]);

  const getScores = (
    batterName: string,
    pitcherName: string,
    count: number[]
  ) => {
    if (batterName in batterData && pitcherName in pitcherData) {
      const batterScores = batterData[batterName];
      const pitcherScores = pitcherData[pitcherName];
      const offset = countOffset[count[0]][count[1]];

      let combinedScores: { [key: string]: number[] } = {};
      // Multiply together scores and put them into an object that indexes vectors
      for (const key in batterScores) {
        const splitKey = key.split("', ");
        const firstKey = splitKey[0].substring(2);
        const secondKey = parseInt(splitKey[1]);
        if (firstKey in combinedScores) {
          combinedScores[firstKey][secondKey] =
            batterScores[key] * pitcherScores[key];
        } else {
          combinedScores[firstKey] = [0, 0]; // need to make this adaptive...
          combinedScores[firstKey][secondKey] =
            batterScores[key] * pitcherScores[key];
        }
      }
      let probabilities: number[] = Array(eventOrder.length);
      for (const [key, value] of Object.entries(combinedScores)) {
        probabilities[eventOrder.findIndex((elem) => elem == key)] =
          value.reduce((a, b) => a + b);
      }
      probabilities = probabilities.map(
        (value, index) => value + offset[index]
      );
      return softmax(probabilities);
    } else {
      alert("Batter Name and Pitcher Name not in data");
    }
  };

  const handleClick = async () => {
    loadData(false);
    const score = getScores(batterName, pitcherName, count);
    if (!(score === undefined)) {
      setProbabilityArray((value) => [...value, score]);
    }
  };

  const loadData = (forceReload: boolean) => {
    if (!dataLoaded || forceReload) {
      fetch("./model_params/batter_fit.json")
        .then((resp) => resp.json())
        .then((resp) => {
          setBatterData(resp);
          setBatterNames(Object.keys(resp));
        });

      fetch("./model_params/pitcher_fit.json")
        .then((resp) => resp.json())
        .then((resp) => {
          setPitcherData(resp);
          setPitcherNames(Object.keys(resp));
        });

      fetch("./model_params/count_fit.json")
        .then((resp) => resp.json())
        .then((resp: { [key: string]: { [eventName: string]: number } }) => {
          let offsetObject: {
            [ball: number]: { [strike: number]: number[] };
          } = {};
          for (const [key, value] of Object.entries(resp)) {
            const splitKey = key.split(", ");
            let probArray: number[] = Array(eventOrder.length);
            for (const [eventName, num] of Object.entries(value)) {
              probArray[eventOrder.findIndex((elem) => elem == eventName)] =
                num;
            }
            if (
              offsetObject[parseInt(splitKey[0].substring(1))] === undefined
            ) {
              offsetObject[parseInt(splitKey[0].substring(1))] = {};
            }
            offsetObject[parseInt(splitKey[0].substring(1))][
              parseInt(splitKey[1])
            ] = probArray;
          }
          setCountOffset(offsetObject);
        });
      setDataLoaded(true);
    }
  };

  useEffect(() => loadData(false));

  return (
    <>
      <h2>
        Nobody ever asks <em>how</em> the odds are.
      </h2>
      <br />
      <StateInput
        batterNames={batterNames}
        pitcherNames={pitcherNames}
        setPitcherName={setPitcherName}
        setBatterName={setBatterName}
        setCount={setCount}
        count={count}
      ></StateInput>
      <div style={{ textAlign: "center" }}>
        <button onClick={handleClick} className="btn btn-primary top-buffer">
          Find Probability!
        </button>
      </div>
      <br />
      <div className="top-buffer">
        <StatsTable
          probabilityArray={probabilityArray}
          header={eventOrder}
        ></StatsTable>
      </div>
    </>
  );
}

export default App;
