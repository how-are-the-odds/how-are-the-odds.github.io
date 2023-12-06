import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import "./BetterMap.css";
import { scaleLinear } from "d3-scale";
import { Tooltip } from "react-tooltip";
import { Container, Paper } from "@mui/material";
import { odds } from "../MapPage";

interface countyDataSet {
  county_fips: string;
  pivot_odds: number;
  log_pivot_odds: number;
}

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";
const gold = "#dec057";
const darkBlue = "#000060";

interface MapChartProps {
  countyData: Array<countyDataSet>;
  oddsData: Array<odds>;
}

const MapChart = ({ countyData, oddsData }: MapChartProps) => {
  const max_log_prob = Math.max(...countyData.map((d) => d.log_pivot_odds));
  const min_log_prob = -12;
  const colorScale = scaleLinear(
    [min_log_prob, max_log_prob],
    [darkBlue, gold]
  );

  return (
    <>
      <Tooltip id="my-tooltip" float={true}></Tooltip>
      <Paper elevation={12} square={false} className="map-container">
        <Container>
          <ComposableMap projection="geoAlbersUsa">
            <ZoomableGroup center={[0, 0]}>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const cur = countyData.find(
                      (s) => s.county_fips === geo.id
                    );
                    const prob = cur
                      ? (100 * cur.pivot_odds).toFixed(6) + "%"
                      : "no election recorded";
                    const color = cur
                      ? colorScale(Math.max(cur.log_pivot_odds, min_log_prob))
                      : "#EEEEEE";
                    const comparisonProb = oddsData.find(
                      (o) => o.probability < (cur ? cur.pivot_odds : 0)
                    )?.event;
                    const hoverColor = scaleLinear([0, 1], [color, "gray"])(0.7);
                    return (
                      <a
                        data-tooltip-id="my-tooltip"
                        data-tooltip-html={
                          geo.properties.name +
                          "<br />" +
                          prob +
                          "<br />" +
                          comparisonProb
                        }
                        data-tooltip-place="top"
                        key={geo.rsmKey}
                      >
                        <Geography
                          className="county"
                          geography={geo}
                          style={{
                            default: {
                              fill: color,
                            },
                            hover: {
                              fill: hoverColor,
                            },
                          }}
                        ></Geography>
                      </a>
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </Container>
      </Paper>
    </>
  );
};

export default MapChart;
