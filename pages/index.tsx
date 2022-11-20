import { Stack, Typography, Link as MUILink, Chip } from "@mui/material";
import Layout from "components/Layout";
import { INTL_METHODS } from "data";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const methods = Object.keys(INTL_METHODS).map((method) => {
    const methodsAvailable = ["DateTimeFormat"];
    const isMethodAvailable = methodsAvailable.includes(method);
    const href = isMethodAvailable
      ? `/constructors/${encodeURIComponent(method)}`
      : "/comming-soon";
    return (
      <Stack key={method} component="li">
        <Stack direction="row" spacing={2} alignItems="center">
          <MUILink underline="hover" variant="h6" component={Link} href={href}>
            {method}
          </MUILink>
          {isMethodAvailable ? (
            ""
          ) : (
            <Chip
              color="info"
              size="small"
              label="Comming soon"
              variant="outlined"
            />
          )}
        </Stack>
        <Typography>{INTL_METHODS[method].description}</Typography>
      </Stack>
    );
  });

  return (
    <>
      <Head>
        <title>Intl Explorer</title>
        <meta name="description" content="Intl Explorer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Typography component="h1" variant="h3">
          Explore the Intl API <br /> without getting lost in the docs.
        </Typography>
        <Typography>
          The <b>Intl</b> object is the namespace for the ECMAScript
          Internationalization API, which provides language sensitive string
          comparison, number formatting, and date and time formatting. The Intl
          object provides access to several constructors as well as
          functionality common to the internationalization constructors and
          other language sensitive functions.
        </Typography>
        <Stack>
          <Typography component="h2" variant="h5">
            Constructor properties
          </Typography>
          <Stack component="ul" spacing={2}>
            {methods}
          </Stack>
        </Stack>
      </Layout>
    </>
  );
}
