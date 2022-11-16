import React from "react";
import {
  Typography,
  Stack,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";

import { DATE_STYLES, TIME_STYLES, LOCALES, DAY_PERIODS } from "../../data";

type TDateStyle = "full" | "long" | "medium" | "short";
type TTimeStyle = "full" | "long" | "medium" | "short";
type TDayPeriod = "narrow" | "short" | "long";

function DateTimeFormat() {
  const [date, setDate] = React.useState(new Date());
  const [locale, setLocale] = React.useState("en-US");
  const [dateStyle, setDateStyle] = React.useState<TDateStyle | undefined>();
  const [timeStyle, setTimeStyle] = React.useState<TTimeStyle | undefined>();
  const [dayPeriod, setDayPeriod] = React.useState<TDayPeriod | undefined>(
    undefined
  );

  const formattedDate = new Intl.DateTimeFormat(locale, {
    dateStyle,
    timeStyle,
    dayPeriod,
  }).format(date);

  React.useEffect(() => {
    // Update the date every second
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const options = {
    ...(dateStyle && { dateStyle }),
    ...(timeStyle && { timeStyle }),
    ...(dayPeriod && { dayPeriod }),
  };

  const hasOptions = Object.keys(options).length > 0;

  const optionsSnippet = hasOptions
    ? `,${JSON.stringify(options, null, 2)}`
    : "";
  const codeSnippet = `new Intl.DateTimeFormat("${locale}"${optionsSnippet})\n.format( new Date() )`;

  return (
    <Container
      maxWidth="lg"
      sx={{
        height: "100vh",
      }}
    >
      <Stack spacing={2} py={4} sx={{ height: "100%" }}>
        <Typography component="h1" variant="h6">
          DateTimeFormat
        </Typography>
        <Stack spacing={2} direction="row" sx={{ flex: 1 }}>
          <Stack flex="1" spacing={2}>
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel>Locale</InputLabel>
              <Select
                value={locale}
                onChange={(e) => setLocale(e.target.value)}
              >
                {LOCALES.map(([locale, name]) => (
                  <MenuItem key={locale} value={locale}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Date style</FormLabel>
              <RadioGroup
                row
                value={dateStyle}
                onChange={(e) => setDateStyle(e.target.value as TDateStyle)}
              >
                {DATE_STYLES.map((value) => (
                  <FormControlLabel
                    key={value}
                    value={value}
                    control={<Radio />}
                    label={value}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Time style</FormLabel>
              <RadioGroup
                row
                value={timeStyle}
                onChange={(e) => setTimeStyle(e.target.value as TTimeStyle)}
              >
                {TIME_STYLES.map((value) => (
                  <FormControlLabel
                    key={value}
                    value={value}
                    control={<Radio />}
                    label={value}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Day period</FormLabel>
              <RadioGroup
                row
                value={dayPeriod}
                onChange={(e) => setDayPeriod(e.target.value as TDayPeriod)}
              >
                {DAY_PERIODS.map((period) => (
                  <FormControlLabel
                    key={period}
                    value={period}
                    control={<Radio />}
                    label={period}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Stack>
          <Stack width="50%" justifyContent="space-between" spacing={2}>
            <Stack alignItems="center">
              <Typography align="center" component="h1" variant="h4">
                {formattedDate}
              </Typography>
            </Stack>
            <Stack
              sx={{
                p: 2,
                border: "solid 1px",
                flex: 1,
                overflowY: "auto",
              }}
            >
              <pre>
                <code>{codeSnippet}</code>
              </pre>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}

export default DateTimeFormat;
