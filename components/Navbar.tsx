import {
  Stack,
  Link as MUILink,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { INTL_METHODS } from "data";
import { Menu } from "@mui/icons-material";
import Link from "next/link";
import Logo from "./Logo";
import { useState } from "react";

const methodsAvailable = ["DateTimeFormat"];

function Navbar() {
  const links = Object.keys(INTL_METHODS).map((method) => {
    const isMethodAvailable = methodsAvailable.includes(method);
    const href = isMethodAvailable
      ? `/constructors/${encodeURIComponent(method)}`
      : "/comming-soon";
    return {
      href: href,
      label: method,
      isAvailable: isMethodAvailable,
    };
  });
  return (
    <Stack
      direction="row"
      alignItems="center"
      position="sticky"
      top={0}
      width="100%"
      zIndex={10}
      sx={{
        py: [1, 2],
        px: [2, 4],
        bgcolor: (theme) => theme.palette.background.paper,
      }}
    >
      <Logo />
      <Links links={links} />
    </Stack>
  );
}

interface ILinksProps {
  links: { href: string; label: string; isAvailable: boolean }[];
}
const Links = ({ links }: ILinksProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function toggleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  return (
    <>
      <Stack
        sx={{
          display: ["none", "none", "flex"],
        }}
        direction="row"
        spacing={2}
      >
        {links.map((link) => (
          <MUILink
            key={link.label}
            href={link.href}
            component={Link}
            underline="hover"
          >
            {link.label}
          </MUILink>
        ))}
      </Stack>

      <IconButton
        sx={{
          display: ["block", "block", "none"],
        }}
        onClick={toggleMobileMenu}
      >
        <Menu />
      </IconButton>
      <Drawer open={isMobileMenuOpen} anchor="right" onClose={toggleMobileMenu}>
        <List>
          {links.map((link) => (
            <ListItem key={link.label} disablePadding>
              <ListItemButton href={link.href} LinkComponent={Link}>
                <ListItemText
                  primary={link.label}
                  secondary={link.isAvailable ? "" : "Comming soon"}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
