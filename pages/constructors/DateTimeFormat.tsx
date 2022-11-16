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
  AccordionSummary,
  Accordion,
  AccordionDetails,
  Alert,
  AlertTitle,
  FormGroup,
  Switch,
  FormHelperText,
} from "@mui/material";

import { ExpandMore } from "@mui/icons-material";

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
  const [hour12, setHour12] = React.useState<boolean | undefined>(undefined);

  const formattedDate = new Intl.DateTimeFormat(locale, {
    dateStyle,
    timeStyle,
    dayPeriod,
    hour12,
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