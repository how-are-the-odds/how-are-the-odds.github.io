import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import "./BetterMap.css";
import { scaleLinear } from "d3-scale";
import { Tooltip } from "react-tooltip";

interface countyDataSet {
  county_fips: string;
  pivot_odds: number;
  log_pivot_odds: number;
}

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";
const gold = "#dec057";
const light_gold = "#b0a037";

interface MapChartProps {
  countyData: Array<countyDataSet>;
}

const MapChart = ({ countyData }: MapChartProps) => {
  const max_log_prob = Math.max(...countyData.map((d) => d.log_pivot_odds));
  console.log(max_log_prob);
  const min_log_prob = -12;
  const colorScale = scaleLinear(
    [min_log_prob, max_log_prob],
    ["darkblue", gold]
  );

  return (
    <>
      <Tooltip id="my-tooltip" float={true}></Tooltip>
      <div className="map-container">
        <ComposableMap projection="geoAlbersUsa">
          <ZoomableGroup center={[0, 0]}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const cur = countyData.find((s) => s.county_fips === geo.id);
                  const prob = cur
                    ? (100 * cur.pivot_odds).toFixed(6) + "%"
                    : "no election recorded";
                  const color = cur
                    ? colorScale(Math.max(cur.log_pivot_odds, min_log_prob))
                    : "#EEEEEE";
                  return (
                    <a
                      data-tooltip-id="my-tooltip"
                      data-tooltip-html={geo.properties.name + "<br />" + prob}
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
                            fill: gold,
                          },
                          pressed: {
                            fill: light_gold,
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
      </div>
    </>
  );
};

export default MapChart;
