import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
      light: "#ffffff",
      dark: "#4444dd",
      contrastText: "#fff",
    },
    secondary: {
      main: "#e3f2fd",
      light: "#ffffff",
      dark: "#ffffff",
      contrastText: "#fff",
    },
  },
  spacing: 2
});
