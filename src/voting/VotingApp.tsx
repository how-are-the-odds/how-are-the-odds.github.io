import "./App.css";
import BetterMap from "./components/BetterMap";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { useEffect, useState } from "react";
import { dsv } from "d3-fetch";

interface countyDataSet {
  county_fips: string;
  pivot_odds: number;
  log_pivot_odds: number;
}

const nonPartisanCsvUrl =
  "https://raw.githubusercontent.com/Daniel-Packer/vote-counts/main/data/county_pivot_odds_c2.csv";
const partisanCsvUrl =
  "https://raw.githubusercontent.com/Daniel-Packer/vote-counts/main/data/partisan_county_pivot_odds.csv";

function VotingApp() {
  const [countyData, setCountyData] = useState(Array<countyDataSet>);
  const [partisan, setPartisan] = useState(true);

  const getCountyData = () => {
    const csvUrl = partisan ? partisanCsvUrl : nonPartisanCsvUrl;

    dsv(",", csvUrl, (d) => {
      return {
        county_fips: d.county_fips,
        pivot_odds: Number(d.pivot_odds),
        log_pivot_odds: Number(d.log_pivot_odds),
      };
    }).then((counties) => {
      setCountyData(counties);
    });
  };

  useEffect(() => {
    getCountyData();
  }, [partisan]);

  const toggleMode = () => {
    setPartisan(!partisan);
    getCountyData();
  };

  return (
    <>
      <button onClick={toggleMode}>{partisan ? "Partisan View" : "Non-Partisan View"}</button>
      <div className="large">
        <BetterMap countyData={countyData}></BetterMap>
      </div>
      <Tooltip id="my-tooltip" float={true}></Tooltip>
    </>
  );
}

export default VotingApp;
