import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    text: {
      primary: "#e3e8ed",
    },
    primary: {
      main: "#fca6d1",
    },
    secondary: {
      main: "#99d6ea",
    },
    background: {
      default: "#212b42",
      paper: "#1b2334",
    },
    info: {
      main: "#3cc5f8",
    },
    warning: {
      main: "#f3ea5d",
    },
    error: {
      main: "#ff5869",
    },
    success: {
      main: "#7ae1bf",
    },
  },
});

export default darkTheme;
