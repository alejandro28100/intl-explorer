import React from "react";
import {
  Typography,
  Stack,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  AccordionSummary,
  Accordion,
  AccordionDetails,
  Alert,
  AlertTitle,
  FormGroup,
  Switch,
  FormHelperText,
  Autocomplete,
  TextField,
} from "@mui/material";

import { ExpandMore } from "@mui/icons-material";

import {
  DATE_STYLES,
  TIME_STYLES,
  LOCALES,
  DAY_PERIODS,
  TIMEZONES,
} from "data";
import { RadioGroup } from "components";

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
  const [timeZone, setTimeZone] = React.useState<{
    timeZone: string;
    firstLetter: string;
  }>(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return {
      timeZone: tz,
      firstLetter: tz[0].toUpperCase(),
    };
  });
  const [hour12, setHour12] = React.useState<boolean | undefined>(undefined);

  const formattedDate = new Intl.DateTimeFormat(locale, {
    dateStyle,
    timeStyle,
    dayPeriod,
    hour12,
    timeZone: timeZone.timeZone,
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
    ...(hour12 !== undefined && { hour12 }),
    ...(timeZone && { timeZone: timeZone.timeZone }),
  };

  const hasOptions = Object.keys(options).length > 0;

  const optionsSnippet = hasOptions
    ? `,${JSON.stringify(options, null, 2)}`
    : "";
  const codeSnippet = `new Intl.DateTimeFormat("${locale}"${optionsSnippet})\n.format( new Date() )`;

  // Add the firstLetter field to each timezone
  // This is used to group the timezones by the first letter
  const timezoneOptions = TIMEZONES.map((timeZone) => ({
    timeZone,
    firstLetter: timeZone[0].toUpperCase(),
  }));
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
        <Stack spacing={2} direction="row">
          <Stack
            sx={{ height: "80vh", overflowY: "auto", px: 0.5, pr: 2 }}
            flex="1"
            spacing={2}
          >
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
            <Autocomplete
              value={timeZone}
              options={timezoneOptions}
              groupBy={(option) => option.firstLetter}
              getOptionLabel={(option) => option.timeZone}
              onChange={(e, value) => value && setTimeZone(value)}
              renderInput={(params) => (
                <TextField {...params} variant="filled" label="Timezone" />
              )}
            />
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    value={hour12}
                    onChange={(e) => setHour12(e.target.checked)}
                  />
                }
                label="Hour 12"
              />
              <FormHelperText>
                Whether to use 12-hour time (as opposed to 24-hour time).
              </FormHelperText>
            </FormGroup>
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Fast Formatting</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{ display: "flex", gap: 2, flexDirection: "column" }}
              >
                <RadioGroup
                  label="Date style"
                  value={dateStyle}
                  onChange={(e) => setDateStyle(e.target.value as TDateStyle)}
                  options={DATE_STYLES}
                />

                <RadioGroup
                  label="Time style"
                  value={timeStyle}
                  onChange={(e) => setTimeStyle(e.target.value as TTimeStyle)}
                  options={TIME_STYLES}
                />

                <Alert severity="info">
                  <AlertTitle>Note:</AlertTitle>
                  <em>dateStyle</em> can be used with <em>timeStyle</em>, but{" "}
                  <b>not</b> with other options (e.g. <em>weekday</em>,{" "}
                  <em>hour</em>, <em>month</em> , etc.).
                </Alert>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Specific Formatting</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{ display: "flex", gap: 2, flexDirection: "column" }}
              >
                <RadioGroup
                  label="Day period"
                  value={dayPeriod}
                  onChange={(e) => setDayPeriod(e.target.value as TDayPeriod)}
                  options={DAY_PERIODS}
                />
              </AccordionDetails>
            </Accordion>
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
