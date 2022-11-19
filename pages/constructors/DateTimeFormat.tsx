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
  FRACTIONAL_SECOND_DIGITS,
} from "data";
import { RadioGroup } from "components";
import CodeSnippet from "components/CodeSnippet";
import { SnackbarProvider } from "notistack";

type TDateStyle = typeof DATE_STYLES[number] | "none";
type TTimeStyle = typeof TIME_STYLES[number] | "none";
type TDayPeriod = typeof DAY_PERIODS[number] | "none";
type TWeekday = typeof WEEK_DAYS[number] | "none";
type TYear = typeof YEARS[number] | "none";
type TEra = typeof ERAS[number] | "none";
type TMonth = typeof MONTHS[number] | "none";
type TDay = typeof DAYS[number] | "none";
type THour = typeof HOURS[number] | "none";
type TMinute = typeof MINUTES[number] | "none";
type TSecond = typeof SECONDS[number] | "none";
type TFractionalSecondDigits = typeof FRACTIONAL_SECOND_DIGITS[number] | "none";

function DateTimeFormat() {
  const [date, setDate] = React.useState(new Date());
  const [locale, setLocale] = React.useState<string>("");
  const [dateStyle, setDateStyle] = React.useState<TDateStyle>("none");
  const [timeStyle, setTimeStyle] = React.useState<TTimeStyle>("none");
  const [dayPeriod, setDayPeriod] = React.useState<TDayPeriod>("none");
  const [timeZone, setTimeZone] = React.useState<{
    timeZone: string;
    firstLetter: string;
  }>({
    timeZone: "",
    firstLetter: "",
  });
  const [hour12, setHour12] = React.useState<boolean>(false);
  const [weekday, setWeekday] = React.useState<TWeekday>("none");
  const [year, setYear] = React.useState<TYear>("none");
  const [era, setEra] = React.useState<TEra>("none");
  const [month, setMonth] = React.useState<TMonth>("none");
  const [day, setDay] = React.useState<TDay>("none");
  const [hour, setHour] = React.useState<THour>("none");
  const [minute, setMinute] = React.useState<TMinute>("none");
  const [second, setSecond] = React.useState<TSecond>("none");
  const [fractionalSecondDigits, setFractionalSecondDigits] =
    React.useState<TFractionalSecondDigits>("none");

  const formattedDate = new Intl.DateTimeFormat(locale || undefined, {
    dateStyle: dateStyle === "none" ? undefined : dateStyle,
    timeStyle: timeStyle === "none" ? undefined : timeStyle,
    dayPeriod: dayPeriod === "none" ? undefined : dayPeriod,
    hour12,
    timeZone: Boolean(timeZone.timeZone) ? timeZone.timeZone : undefined,
    weekday: weekday === "none" ? undefined : weekday,
    year: year === "none" ? undefined : year,
    era: era === "none" ? undefined : era,
    month: month === "none" ? undefined : month,
    day: day === "none" ? undefined : day,
    hour: hour === "none" ? undefined : hour,
    minute: minute === "none" ? undefined : minute,
    second: second === "none" ? undefined : second,
    fractionalSecondDigits:
      fractionalSecondDigits === "none" ? undefined : fractionalSecondDigits,
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
    }, 1);
    return () => clearInterval(timer);
  }, []);

  const options = {
    ...(dateStyle && dateStyle !== "none" && { dateStyle }),
    ...(timeStyle && timeStyle !== "none" && { timeStyle }),
    ...(dayPeriod && dayPeriod !== "none" && { dayPeriod }),
    ...(hour12 && { hour12 }),
    ...(timeZone && timeZone.timeZone && { timeZone: timeZone.timeZone }),
    ...(weekday && weekday !== "none" && { weekday }),
    ...(year && year !== "none" && { year }),
    ...(era && era !== "none" && { era }),
    ...(month && month !== "none" && { month }),
    ...(day && day !== "none" && { day }),
    ...(hour && hour !== "none" && { hour }),
    ...(minute && minute !== "none" && { minute }),
    ...(second && second !== "none" && { second }),
    ...(fractionalSecondDigits &&
      fractionalSecondDigits !== "none" && { fractionalSecondDigits }),
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
    <SnackbarProvider>
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
                    options={[...DATE_STYLES, "none"]}
                  />

                  <RadioGroup
                    label="Time style"
                    value={timeStyle}
                    onChange={(e) => setTimeStyle(e.target.value as TTimeStyle)}
                    options={[...TIME_STYLES, "none"]}
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
                    options={[...DAY_PERIODS, "none"]}
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
                    options={[...WEEK_DAYS, "none"]}
                  />

                  <RadioGroup
                    label="Era"
                    value={era}
                    onChange={(e) => setEra(e.target.value as TEra)}
                    options={[...ERAS, "none"]}
                  />
                  <RadioGroup
                    label="Year"
                    value={year}
                    onChange={(e) => setYear(e.target.value as TYear)}
                    options={[...YEARS, "none"]}
                  />
                  <RadioGroup
                    label="Month"
                    value={month}
                    onChange={(e) => setMonth(e.target.value as TMonth)}
                    options={[...MONTHS, "none"]}
                  />
                  <RadioGroup
                    label="Day"
                    value={day}
                    onChange={(e) => setDay(e.target.value as TDay)}
                    options={[...DAYS, "none"]}
                  />
                  <RadioGroup
                    label="Hour"
                    value={hour}
                    onChange={(e) => setHour(e.target.value as THour)}
                    options={[...HOURS, "none"]}
                  />
                  <RadioGroup
                    label="Minute"
                    value={minute}
                    onChange={(e) => setMinute(e.target.value as TMinute)}
                    options={[...MINUTES, "none"]}
                  />
                  <RadioGroup
                    label="Second"
                    value={second}
                    onChange={(e) => setSecond(e.target.value as TSecond)}
                    options={[...SECONDS, "none"]}
                  />
                  <RadioGroup
                    label="Fractional Second Digits"
                    value={fractionalSecondDigits}
                    onChange={(e) =>
                      e.target.value === "none"
                        ? setFractionalSecondDigits(
                            e.target.value as TFractionalSecondDigits
                          )
                        : setFractionalSecondDigits(
                            parseInt(e.target.value) as TFractionalSecondDigits
                          )
                    }
                    options={[...FRACTIONAL_SECOND_DIGITS, "none"]}
                  />
                </AccordionDetails>
              </Accordion>
            </Stack>
            <Stack
              width="50%"
              justifyContent="space-between"
              spacing={2}
              sx={{
                flex: 1,
                overflowY: "auto",
                px: 0.5,
                pr: 2,
                maxHeight: "80vh",
              }}
            >
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
                <CodeSnippet code={codeSnippet} />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </SnackbarProvider>
  );
}

export default DateTimeFormat;
