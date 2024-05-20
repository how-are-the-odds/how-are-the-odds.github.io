const hyperSimplify = (str: string) => {
  return str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
};

export const checkAnswer: (
  answer: string,
  response: string
) => "correct" | "maybe" | "incorrect" = (answer: string, response: string) => {
  if (hyperSimplify(answer) === hyperSimplify(response)) {
    return "correct";
  }

  return "maybe";
};
