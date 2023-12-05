import "./Introduction.css"

const Introduction = () => {
  return (
    <center>
      <h2>How are the odds that your vote matters?</h2>
      <p>
        Calculated below are the odds that in a county-level election your vote
        will decide the election. Mouse over your county to see the odds that when you vote you'll be the decider of your county government. The partisan map is based on historical
        partisan lean and voting patterns of the district to estimate the
        probability of a tied (a.k.a. a pivot election) using the formula from{" "}
        <a href="https://www.jstor.org/stable/30025867">here</a>.
        The non-partisan model focuses on examples of actual local elections from 2018, so it is more limited in scope.
      </p>
    </center>
  );
};

export default Introduction;
