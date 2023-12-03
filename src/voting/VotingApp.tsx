import "react-tooltip/dist/react-tooltip.css";
import { dsv } from "d3-fetch";
import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export interface countyDataSet {
  county_fips: string;
  pivot_odds: number;
  log_pivot_odds: number;
}

const nonPartisanCsvUrl =
  "https://raw.githubusercontent.com/Daniel-Packer/vote-counts/main/data/county_pivot_odds_c2.csv";
const partisanCsvUrl =
  "https://raw.githubusercontent.com/Daniel-Packer/vote-counts/main/data/partisan_county_pivot_odds.csv";

export async function loader(partisan: boolean): Promise<countyDataSet[]> {
  const csvUrl = partisan ? partisanCsvUrl : nonPartisanCsvUrl;
  const countyData = await dsv(",", csvUrl, (d) => {
    return {
      county_fips: d.county_fips ? d.county_fips : d.jurisdiction_fips,
      pivot_odds: Number(d.pivot_odds),
      log_pivot_odds: Number(d.log_pivot_odds),
    };
  });
  return countyData;
}

function VotingApp() {
  return (
    <div className="voting-app">
      <div style={{ alignItems: "center" }} className="padded">
        <Stack direction="row" spacing={4} justifyContent="center">
          <Button component={Link} to={`./partisan`} variant="outlined">
            Partisan
          </Button>
          <Button component={Link} to={`./nonpartisan`} variant="outlined">
            Non Partisan
          </Button>
        </Stack>
      </div>
      <Outlet></Outlet>
    </div>
  );
}

export default VotingApp;
