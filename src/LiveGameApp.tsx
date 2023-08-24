import { useEffect, useState } from "react";
import { getGameMatchup, getTodaysGames } from "./LiveGameStatus";
import StatsTable from "./Components/StatsTable";
import { eventOrder, getScores } from "./ProbabilityCompute";
import LiveScoreBoard from "./Components/LiveScoreBoard";
import AtBatMonitor from "./Components/AtBatMonitor";
import NavBar from "./Components/NavBar";
import "./App.css";

const LiveGameApp = () => {
  const [probabilityArray, setProbabilityArray] = useState<number[][]>([]);
  const [batterData, setBatterData] = useState<{
    [key: string]: { [key: string]: number };
  }>({});
  const [pitcherData, setPitcherData] = useState<{
    [key: string]: { [key: string]: number };
  }>({});
  const [countOffset, setCountOffset] = useState<{
    [ball: number]: { [strike: number]: number[] };
  }>({});
  // const [batterNames, setBatterNames] = useState<string[]>([]);
  // const [pitcherNames, setPitcherNames] = useState<string[]>([]);
  const [selectedGameId, setSelectedGameId] = useState<string>("");
  const [liveGameIds, setLiveGameIds] = useState<string[]>([]);
  const [liveGameInfo, setLiveGameInfo] = useState<any>();
  const [batterName, setBatterName] = useState("");
  const [pitcherName, setPitcherName] = useState("");
  const [count, setCount] = useState([0, 0]);
  const [updateLiveGame, setUpdateLiveGame] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);

  const getLiveInfo = (gameId: string) => {
    getGameMatchup(gameId).then((matchupObject) => {
      if (!(matchupObject === undefined)) {
        setBatterName(matchupObject.batter);
        setPitcherName(matchupObject.pitcher);
        setCount([matchupObject.balls, matchupObject.strikes]);
        setLiveGameInfo(matchupObject.response);
      }
    });
  };

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
          // setBatterNames(Object.keys(resp));
        });

      fetch("./model_params/pitcher_fit.json")
        .then((resp) => resp.json())
        .then((resp) => {
          setPitcherData(resp);
          // setPitcherNames(Object.keys(resp));
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

  const getLiveGames = async () => {
    const games = (await getTodaysGames()).games;
    const liveGames = games.filter(
      (game: { status: { abstractGameState: string } }) =>
        game.status.abstractGameState == "Live"
    );
    setLiveGameIds(liveGames.map((game: { gamePk: string }) => game.gamePk));
    console.log(liveGames);
  };

  if (updateLiveGame) {
    getLiveGames().then(() => getLiveInfo(selectedGameId));
    setUpdateLiveGame(false);
  }

  return (
    <>
      <NavBar></NavBar>
      <h2>
        Nobody ever asks <em>how</em> the odds are
      </h2>
      <br />
      <button
        style={{ color: "white" }}
        onClick={() => {
          setUpdateLiveGame(true);
          getLiveGames();
        }}
      >
        Get Live Games
      </button>
      <br />
      {liveGameIds.map((gameId) => (
        <button
          style={{ color: "white" }}
          key={gameId}
          onClick={() => {
            setSelectedGameId(gameId);
            getLiveInfo(gameId);
          }}
        >
          {gameId}
        </button>
      ))}
      <br />
      <LiveScoreBoard
        gameId={selectedGameId}
        gameInfo={liveGameInfo}
      ></LiveScoreBoard>
      <button onClick={handleClick} style={{ color: "white" }}>
        Get Current Probability
      </button>
      <AtBatMonitor
        batter={batterName}
        pitcher={pitcherName}
        balls={count[0]}
        strikes={count[1]}
      ></AtBatMonitor>
      <div className="top-buffer">
        <StatsTable
          probabilityArray={probabilityArray}
          header={eventOrder}
        ></StatsTable>
      </div>
    </>
  );
};

export default LiveGameApp;
