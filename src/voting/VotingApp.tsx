import "react-tooltip/dist/react-tooltip.css";
import { dsv } from "d3-fetch";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Introduction from "./components/Introduction";
import "./VotingApp.css";

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
  const navigate = useNavigate();
  return (
    <Stack spacing={16} alignContent="center" className="voting-app">
      <Introduction></Introduction>
      <center>
        <Outlet></Outlet>
      </center>
      <Stack
        direction="row"
        spacing={4}
        justifyContent="center"
        paddingBottom={"2em"}
      >
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          row
        >
          <FormControlLabel
            value="partisan"
            control={<Radio />}
            onClick={() => navigate("./partisan")}
            label="Partisan"
          />
          <FormControlLabel
            value="nonpartisan"
            control={<Radio />}
            onClick={() => navigate("./nonpartisan")}
            label="Non-Partisan"
          />
        </RadioGroup>
      </Stack>
    </Stack>
  );
}

export default VotingApp;
