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

export const nameConverter = new Map([
  ["doubletriple_hit", "Double or Triple"],
  ["fielded_out", "Fielded Out"],
  ["homerun_hit", "Home Run"],
  ["other", "Other"],
  ["single_hit", "Single (hit)"],
  ["single_walk", "Walk"],
  ["strike_out", "Strike Out"],
]);
