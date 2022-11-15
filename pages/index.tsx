import { Container, Stack, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const Intl_Methods = {
    DateTimeFormat: {
      description:
        "Constructor for objects that enable language-sensitive date and time formatting.",
    },
    NumberFormat: {
      description:
        "Constructor for objects that enable language-sensitive number formatting.",
    },
  } as { [key: string]: { description: string } };

  return (
    <div>
      <Head>
        <title>Intl Visualizer</title>
        <meta name="description" content="Intl visualizer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="md">
        <Stack spacing={2} py={4}>
          <Typography component="h1" variant="h3">
            Intl Visualizer
          </Typography>
          <Typography variant="body1">
            The Intl object is the namespace for the ECMAScript
            Internationalization API, which provides language sensitive string
            comparison, number formatting, and date and time formatting. The
            Intl object provides access to several constructors as well as
            functionality common to the internationalization constructors and
            other language sensitive functions.
          </Typography>
          <Typography component="h2" variant="h4">
            Constructor Properties
          </Typography>
          <Stack component="ul">
            {Object.keys(Intl_Methods).map((method) => (
              <Stack key={method} component="li">
                <Link href={`/constructors/${encodeURIComponent(method)}`}>
                  <Stack>{method}</Stack>
                </Link>
                <Typography variant="body1">
                  {Intl_Methods[method].description}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
