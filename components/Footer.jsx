import { GitHub, LinkedIn } from "@mui/icons-material";
import { Stack, Divider, IconButton, Typography } from "@mui/material";
import Link from "next/link";

function Footer() {
  return (
    <>
      <Divider />
      <Stack
        spacing={1}
        component="footer"
        px={2}
        pt={2}
        pb={[8, 2]}
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
            <GitHub fontSize="medium" />
          </IconButton>
        </Link>
        <Link target="_blank" href="https://www.linkedin.com/in/alejandro-fc">
          <IconButton>
            <LinkedIn fontSize="medium" />
          </IconButton>
        </Link>
      </Stack>
    </>
  );
}

export default Footer;
