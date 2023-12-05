const BaseballDoc = () => {
  return (
    <>
      <p>
        The model finds vectors (in this case in two dimensions) to represent
        each pitcher and batter for each outcome, and additionally computes an
        offset for each count. To produce a prediction, we select the vectors
        for the batter and the pitcher and compute the pairwise inner products
        over the outcomes. These "scores" are then combined with the
        county-offset to produce a score for each possible outcome. Finally, a
        simple softmax function is applied to convert the output to a
        probability distribution.
      </p>
    </>
  );
};

export default BaseballDoc;
