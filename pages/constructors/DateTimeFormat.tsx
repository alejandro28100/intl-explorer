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
  WEEK_DAYS,
  YEARS,
  ERAS,
  MONTHS,
  DAYS,
  HOURS,
  MINUTES,
  SECONDS,
} from "data";
import { RadioGroup } from "components";

type TDateStyle = "full" | "long" | "medium" | "short";
type TTimeStyle = "full" | "long" | "medium" | "short";
type TDayPeriod = "narrow" | "short" | "long";
type TWeekday = "narrow" | "short" | "long";
type TYear = "numeric" | "2-digit";
type TEra = "narrow" | "short" | "long";
type TMonth = "numeric" | "2-digit" | "narrow" | "short" | "long";
type TDay = "numeric" | "2-digit";
type THour = "numeric" | "2-digit";
type TMinute = "numeric" | "2-digit";
type TSecond = "numeric" | "2-digit";

function DateTimeFormat() {
  const [date, setDate] = React.useState(new Date());
  const [locale, setLocale] = React.useState<string>("");
  const [dateStyle, setDateStyle] = React.useState<TDateStyle | undefined>();
  const [timeStyle, setTimeStyle] = React.useState<TTimeStyle | undefined>();
  const [dayPeriod, setDayPeriod] = React.useState<TDayPeriod | undefined>(
    undefined
  );
  const [timeZone, setTimeZone] = React.useState<{
    timeZone: string;
    firstLetter: string;
  }>({
    timeZone: "",
    firstLetter: "",
  });
  const [hour12, setHour12] = React.useState<boolean | undefined>(undefined);
  const [weekday, setWeekday] = React.useState<TWeekday | undefined>(undefined);
  const [year, setYear] = React.useState<TYear | undefined>(undefined);
  const [era, setEra] = React.useState<TEra | undefined>(undefined);
  const [month, setMonth] = React.useState<TMonth | undefined>(undefined);
  const [day, setDay] = React.useState<TDay | undefined>(undefined);
  const [hour, setHour] = React.useState<THour | undefined>(undefined);
  const [minute, setMinute] = React.useState<TMinute | undefined>(undefined);
  const [second, setSecond] = React.useState<TSecond | undefined>(undefined);

  const formattedDate = new Intl.DateTimeFormat(locale || undefined, {
    dateStyle,
    timeStyle,
    dayPeriod,
    hour12,
    timeZone: Boolean(timeZone.timeZone) ? timeZone.timeZone : undefined,
    weekday,
    year,
    era,
    month,
    day,
    hour,
    minute,
    second,
  }).format(date);

  React.useEffect(() => {
    // Set some default values based on the detected device
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz) {
      setTimeZone({
        timeZone: tz,
        firstLetter: tz[0].toUpperCase(),
      });
    }

    const deviceLanguage = navigator.language;
    if (deviceLanguage) {
      setLocale(deviceLanguage);
    }
    console.log("deviceLanguage", deviceLanguage);
    console.log("tz", tz);

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
    ...(weekday && { weekday }),
    ...(year && { year }),
    ...(era && { era }),
    ...(month && { month }),
    ...(day && { day }),
    ...(hour && { hour }),
    ...(minute && { minute }),
    ...(second && { second }),
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
            <FormControl variant="filled">
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
              isOptionEqualToValue={(option, value) =>
                option.timeZone === value.timeZone
              }
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
                <Alert severity="info">
                  <AlertTitle>Note:</AlertTitle>
                  This option only has an effect if a 12-hour clock is used.
                  <br />
                  Many locales use the same string irrespective of the width
                  specified.
                </Alert>

                <RadioGroup
                  label="Weekday"
                  value={weekday}
                  onChange={(e) => setWeekday(e.target.value as TWeekday)}
                  options={WEEK_DAYS}
                />

                <RadioGroup
                  label="Era"
                  value={era}
                  onChange={(e) => setEra(e.target.value as TEra)}
                  options={ERAS}
                />
                <RadioGroup
                  label="Year"
                  value={year}
                  onChange={(e) => setYear(e.target.value as TYear)}
                  options={YEARS}
                />
                <RadioGroup
                  label="Month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value as TMonth)}
                  options={MONTHS}
                />
                <RadioGroup
                  label="Day"
                  value={day}
                  onChange={(e) => setDay(e.target.value as TDay)}
                  options={DAYS}
                />
                <RadioGroup
                  label="Hour"
                  value={hour}
                  onChange={(e) => setHour(e.target.value as THour)}
                  options={HOURS}
                />
                <RadioGroup
                  label="Minute"
                  value={minute}
                  onChange={(e) => setMinute(e.target.value as TMinute)}
                  options={MINUTES}
                />
                <RadioGroup
                  label="Second"
                  value={second}
                  onChange={(e) => setSecond(e.target.value as TSecond)}
                  options={SECONDS}
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
