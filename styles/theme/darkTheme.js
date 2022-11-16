import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#f67599",
    },
    secondary: {
      main: "#99d6ea",
    },
    background: {
      default: "#161821",
    },
  },
});

export default darkTheme;
