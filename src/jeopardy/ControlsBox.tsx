import { Container, Slider, ThemeProvider, Typography, createTheme } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface ControlsBoxProps {
  beta: number;
  setBeta: Dispatch<SetStateAction<number>>;
}

export const ControlsBox = ({ beta, setBeta }: ControlsBoxProps) => {
  const handleChange = (_event: Event, newValue: number | number[]) => {
    setBeta(newValue as number);
  };
  const getColorFromBeta = (beta: number) => {
    const color =
      "#" +
      Math.round((beta / 80 + 0.5) * 255).toString(16) +
      Math.round((-beta / 80 + 0.5) * 255).toString(16) +
      Math.round((-beta / 80 + 0.5) * 255).toString(16);
    console.log(color);
    return color;
  };
  const sliderTheme = createTheme({
    palette: {
      primary: {
        main: getColorFromBeta(beta),
      },
    },
  });
  const marks = [
    { value: 0, label: "random" },
    {
      value: 20,
      label: "harder",
    },
    {
      value: -20,
      label: "easier",
    },
  ];
  return (
    <Container style={{borderColor: "#000", borderWidth: 2}}>
      <ThemeProvider theme={sliderTheme}>
        <Typography id="difficulty-slider">
          <b>Personal Difficulty</b>
        </Typography>
        <Slider
          aria-labelledby="difficulty-slider"
          marks={marks}
          track={false}
          min={-30}
          max={30}
          value={beta}
          onChange={handleChange}
          color="primary"
        ></Slider>
      </ThemeProvider>
    </Container>
  );
};
