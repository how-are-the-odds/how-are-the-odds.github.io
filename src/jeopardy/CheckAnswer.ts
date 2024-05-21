const hyperSimplify = (str: string) => {
  return str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
};

const removeArticles = (str: string) => {
    return str.replace(/^(a|an|the)\s+/i, "");
    };

const removeParenthetical = (str: string) => {
    return str.replace(/\(.*\)/, "");
}

export const checkAnswer: (
  answer: string,
  response: string
) => "correct" | "maybe" | "incorrect" = (answer: string, response: string) => {
  const responses = [response, removeArticles(response), removeParenthetical(response), removeArticles(removeParenthetical(response))].map(hyperSimplify);
  if (responses.includes(removeArticles(hyperSimplify(answer)))) {
    return "correct";
  }

  return "maybe";
};
