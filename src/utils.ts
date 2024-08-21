export const uniqBy: <T>(a: T[], key: (a: T) => string) => T[] = (a, key) => {
  const seen: { [key: string]: boolean } = {};
  return a.filter((item) => {
    const k = key(item);

    return Object.prototype.hasOwnProperty.call(seen, k)
      ? false
      : (seen[k] = true);
  });
};

export const softMatch = (s1: string, s2: string) => {
  return (
    s1.toLowerCase().includes(s2.toLowerCase()) ||
    s2.toLowerCase().includes(s1.toLowerCase())
  );
};

export const colorScale = (startColor: string, endColor: string) => {
  const startColorArray = parseColor(startColor);
  const endColorArray = parseColor(endColor);
  return (num: number) => {
    if (num > 1.0 || num < 0.0) {
      throw RangeError(
        "The value of the interpolating number must be between 0 and 1!",
      );
    }
    const mixedColorArray = startColorArray.map((col_val: number, ix: number) =>
      Math.round(col_val * (1 - num) + endColorArray[ix] * num).toString(),
    );

    return (
      "rgb(" +
      mixedColorArray[0] +
      ", " +
      mixedColorArray[1] +
      ", " +
      mixedColorArray[2] +
      ")"
    );
  };
};

export const parseColor = (color: string) => {
  const m = color.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
  if (m) {
    return [Number(m[1]), Number(m[2]), Number(m[3])];
  }
  throw Error("No match for color pattern of: " + color);
};

export type CSVRow = string[];
export type CSVData = CSVRow[];

export async function readCSV(
  url: string,
  newLineSymbol: string,
): Promise<CSVData> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const csvText = await response.text();
    const rows: CSVData = csvText
      .split(newLineSymbol)
      .map((row) => row.split(","));
    return rows;
  } catch (error) {
    console.error("Error reading CSV:", error);
    throw error;
  }
}

export const formatStringList = (strings: string[]) => {
  if (strings.length == 0) {
    return "";
  }
  if (strings.length == 1) {
    return strings[0];
  }
  if (strings.length == 2) {
    return strings[0] + " and " + strings[1];
  }

  const andedStrings = [
    ...strings.slice(0, -2),
    strings[-2] + ", and " + strings[-1],
  ];
  return andedStrings.reduce((acc, val) => acc + ", " + val, "");
};
