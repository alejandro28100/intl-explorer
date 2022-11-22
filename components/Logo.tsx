import { Explore } from "@mui/icons-material";
import { Typography, Link as MUILink, IconButton } from "@mui/material";
import Link from "next/link";
function Logo() {
  return (
    <MUILink
      sx={{
        flex: 1,
        gap: 2,
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        color: "inherit",
        cursor: "pointer",
      }}
      href="/"
      component={Link}
    >
      <IconButton size="large">
        <Explore fontSize="large" />
      </IconButton>
      <Typography component="span" variant="h6">
        Intl Explorer
      </Typography>
    </MUILink>
  );
}

export default Logo;
