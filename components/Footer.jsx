import { GitHub, LinkedIn } from "@mui/icons-material";
import { Stack, Divider, IconButton, Typography } from "@mui/material";
import Link from "next/link";

function Footer() {
  return (
    <>
      <Divider />
      <Stack
        spacing={2}
        component="footer"
        p={2}
        width="100%"
        direction="row"
        justifyContent="end"
        alignItems="center"
        sx={{
          bgcolor: (theme) => theme.palette.background.default,
        }}
      >
        <Typography>Made with ❤️ by Alejandro Fuentes</Typography>
        <Link
          target="_blank"
          href="https://github.com/alejandro28100/intl-explorer"
        >
          <IconButton>
            <GitHub fontSize="large" />
          </IconButton>
        </Link>
        <Link target="_blank" href="https://www.linkedin.com/in/alejandro-fc">
          <IconButton>
            <LinkedIn fontSize="large" />
          </IconButton>
        </Link>
      </Stack>
    </>
  );
}

export default Footer;
