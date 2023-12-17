import { Slider, Typography } from "@mui/material";

interface LearningRateSliderProps {
  learningRate: number;
  setLearningRate: (a: number) => void;
}

const LearningRateSlider = ({
  learningRate,
  setLearningRate,
}: LearningRateSliderProps) => (
  <div style={{ maxWidth: "10rem", minWidth: "10vw" }}>
    <Typography gutterBottom>
      Learning Rate: {learningRate.toFixed(3)}
    </Typography>

    <Slider
      value={Math.log(learningRate)}
      valueLabelFormat={(x) => Math.exp(x).toFixed(2)}
      step={0.01}
      size="medium"
      min={-8}
      max={0.0}
      onChange={(e) => {
        const eTarget = e.target! as unknown as { value: number };
        setLearningRate(eTarget.value ? Math.exp(eTarget.value) : 0);
      }}
    />
  </div>
);

export default LearningRateSlider;
