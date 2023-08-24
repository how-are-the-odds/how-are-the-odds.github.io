import { useEffect, useState } from "react";
import "./App.css";
import StatsTable from "./Components/StatsTable";
import { eventOrder, getScores } from "./ProbabilityCompute";
import StateInput from "./Components/StateInput";
import NavBar from "./Components/NavBar";

function StaticApp() {
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

  const handleClick = async () => {
    loadData(false);
    const score = getScores(
      batterName,
      pitcherName,
      count,
      batterData,
      pitcherData,
      countOffset
    );
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
      <NavBar></NavBar>
      <h2>
        Nobody ever asks <em>how</em> the odds are.
      </h2>
      <br />
      <StateInput
        batterNames={batterNames}
        pitcherName={pitcherName}
        pitcherNames={pitcherNames}
        setPitcherName={setPitcherName}
        batterName={batterName}
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

export default StaticApp;
