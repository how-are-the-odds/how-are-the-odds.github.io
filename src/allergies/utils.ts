import { colorScale } from "../utils";
const severityColorScale = colorScale("rgb(255, 0, 0)", "rgb(0, 60, 255)");
export const severityNumberToColor = (num: number) => {
  if (num < 1 || num > 7) {
    throw RangeError("Unknown severity value: " + num.toString());
  }
  const ratio = (num - 1) / 6.001;
  return severityColorScale(ratio);
};
