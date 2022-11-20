import { Container, ContainerProps, Stack } from "@mui/material";
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface ILayoutProps extends ContainerProps {
  children: React.ReactNode;
}

export default function Layout({
  children,
  sx,
  maxWidth = "lg",
  ...rest
}: ILayoutProps) {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <Navbar />
      <Container
        maxWidth={maxWidth}
        component="main"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          py: 2,
          ...sx,
        }}
        {...rest}
      >
        {children}
      </Container>
      <Footer />
    </Stack>
  );
}
