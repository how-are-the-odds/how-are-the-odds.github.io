import "../../Introduction.css";
const Introduction = () => {
  return (
    <>
      <h2>A Look at a Neural Network</h2>
      <p>
        This is an implementation of a standard, feed-forward neural network in
        Javascript! This uses my own (very elementary) implementation of
        autograd. Since this all happens in the front-end, it only supports very
        small numbers of parameters. Changing specific parameters (the number of
        layers, layer width, or Non-Linearity) will reinitialize the entire
        model. Pressing "poke", will set a single parameter to a value near
        zero. This can help the model escape a local minimum if you see it
        getting stuck. Let me know if you think other non-linearities or
        architectures would be worth adding in.
      </p>
    </>
  );
};

export default Introduction;
