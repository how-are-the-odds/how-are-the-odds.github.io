import { useLoaderData } from "react-router-dom";
import BetterMap from "./components/BetterMap";
import { countyDataSet } from "./VotingApp";

const MapPage = () => {
  const countyData = useLoaderData() as countyDataSet[];
  return <BetterMap countyData={countyData}/>;
};

export default MapPage;
