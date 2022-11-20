import { Stack, Link as MUILink } from "@mui/material";
import { INTL_METHODS } from "data";
import Link from "next/link";
import Logo from "./Logo";

function Navbar() {
  const links = Object.keys(INTL_METHODS).map((method) => {
    const href =
      method === "DateTimeFormat"
        ? `/constructors/${encodeURIComponent(method)}`
        : "/comming-soon";
    return (
      <MUILink key={method} href={href} component={Link} underline="hover">
        {method}
      </MUILink>
    );
  });
  return (
    <Stack
      direction="row"
      alignItems="center"
      py={2}
      px={4}
      position="sticky"
      top={0}
      width="100%"
      sx={{
        bgcolor: (theme) => theme.palette.background.paper,
      }}
    >
      <Logo />
      <Stack direction="row" spacing={2}>
        {links}
      </Stack>
    </Stack>
  );
}

export default Navbar;
