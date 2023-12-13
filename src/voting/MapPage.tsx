import { useLoaderData } from "react-router-dom";
import BetterMap from "./components/CountyMap";
import { countyDataSet } from "./VotingApp";

const MapPage = () => {
  const countyData = useLoaderData() as countyDataSet[];
  return <BetterMap countyData={countyData} oddsData={pokerOdds} />;
};

export default MapPage;

export interface odds {
  event: string;
  probability: number;
}

const pokerOdds: odds[] = [
  {
    event: "Straight",
    probability: 0.003925,
  },
  {
    event: "Flush",
    probability: 0.001965,
  },
  {
    event: "Full house",
    probability: 0.001441,
  },
  {
    event: "Four of a kind",
    probability: 0.0002401,
  },
  {
    event: "Straight flush",
    probability: 0.0000139,
  },
  {
    event: "Royal flush",
    probability: 0.00000154,
  },
  {
    event: "Two four of a kinds in a row",
    probability: 0.0002401 * 0.0002401,
  },
  {
    event: "Too rare for poker",
    probability: -1,
  },
];
