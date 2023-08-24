// Function for computing the softmax of an object:
export const softmax = (scoreArray: number[]) => {
  const expScoreArray = scoreArray.map((score: number) => Math.exp(score));
  const total = expScoreArray.reduce((a, b) => a + b);

  return expScoreArray.map((value) => value / total);
};

export async function getBatterVec(batter_name: string) {
  const json = fetch("./src/model_params/batter_fit.json")
    .then((response) => response.json())
    .then((json) => json[batter_name]);

  return json;
}

export const eventOrder: string[] = [
  "fielded_out",
  "strike_out",
  "single_walk",
  "single_hit",
  "doubletriple_hit",
  "homerun_hit",
  "other",
];

export const getScores = (
  batterName: string,
  pitcherName: string,
  count: number[],
  batterData: any,
  pitcherData: any,
  countOffset: any
) => {
  if (batterName in batterData && pitcherName in pitcherData) {
    const batterScores = batterData[batterName];
    const pitcherScores = pitcherData[pitcherName];
    const offset = countOffset[count[0]][count[1]];

    let combinedScores: { [key: string]: number[] } = {};
    // Multiply together scores and put them into an object that indexes vectors
    for (const key in batterScores) {
      const splitKey = key.split("', ");
      const firstKey = splitKey[0].substring(2);
      const secondKey = parseInt(splitKey[1]);
      if (firstKey in combinedScores) {
        combinedScores[firstKey][secondKey] =
          batterScores[key] * pitcherScores[key];
      } else {
        combinedScores[firstKey] = [0, 0]; // need to make this adaptive...
        combinedScores[firstKey][secondKey] =
          batterScores[key] * pitcherScores[key];
      }
    }
    let probabilities: number[] = Array(eventOrder.length);
    for (const [key, value] of Object.entries(combinedScores)) {
      probabilities[eventOrder.findIndex((elem) => elem == key)] = value.reduce(
        (a, b) => a + b
      );
    }
    probabilities = probabilities.map((value, index) => value + offset[index]);
    return softmax(probabilities);
  } else {
    alert("Batter Name and Pitcher Name not in data");
  }
};

export const nameConverter = new Map([
  ["doubletriple_hit", "Double or Triple"],
  ["fielded_out", "Fielded Out"],
  ["homerun_hit", "Home Run"],
  ["other", "Other"],
  ["single_hit", "Single (hit)"],
  ["single_walk", "Walk"],
  ["strike_out", "Strike Out"],
]);
