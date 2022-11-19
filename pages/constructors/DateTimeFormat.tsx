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

type TState = {
  date: Date;
  locale: "";
  dateStyle: TDateStyle;
  timeStyle: TTimeStyle;
  dayPeriod: TDayPeriod;
  timeZone: {
    timeZone: "";
    firstLetter: "";
  };
  hour12: boolean;
  weekday: TWeekday;
  year: TYear;
  era: TEra;
  month: TMonth;
  day: TDay;
  hour: THour;
  minute: TMinute;
  second: TSecond;
  fractionalSecondDigits: TFractionalSecondDigits;
};

const initialState: TState = {
  date: new Date(),
  locale: "",
  dateStyle: "none",
  timeStyle: "none",
  dayPeriod: "none",
  timeZone: {
    timeZone: "",
    firstLetter: "",
  },
  hour12: false,
  weekday: "none",
  year: "none",
  era: "none",
  month: "none",
  day: "none",
  hour: "none",
  minute: "none",
  second: "none",
  fractionalSecondDigits: "none",
};

type TAction = TUpdateOption;
type TUpdateOption = {
  type: "update-option";
  payload: { option: string; value: any };
};

function reducer(state: TState, action: TAction) {
  switch (action.type) {
    case "update-option":
      return {
        ...state,
        [action.payload.option]: action.payload.value,
      };
  }
}

function DateTimeFormat() {
  const [
    {
      date,
      locale,
      dateStyle,
      timeStyle,
      dayPeriod,
      timeZone,
      hour12,
      weekday,
      year,
      era,
      month,
      day,
      fractionalSecondDigits,
      hour,
      minute,
      second,
    },
    dispatch,
  ] = React.useReducer(reducer, initialState);

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
      dispatch({
        type: "update-option",
        payload: {
          option: "timeZone",
          value: {
            timeZone: tz,
            firstLetter: tz[0],
          },
        },
      });
    }

    const deviceLanguage = navigator.language;
    if (deviceLanguage) {
      dispatch({
        type: "update-option",
        payload: {
          option: "locale",
          value: deviceLanguage,
        },
      });
    }
    console.log("deviceLanguage", deviceLanguage);
    console.log("tz", tz);

    // Update the date every second
    const timer = setInterval(() => {
      dispatch({
        type: "update-option",
        payload: {
          option: "date",
          value: new Date(),
        },
      });
    }, 1);
    return () => clearInterval(timer);
  }, []);

  const options = {
    ...(dateStyle && dateStyle !== "none" && { dateStyle }),
    ...(timeStyle && timeStyle !== "none" && { timeStyle }),
    ...(dayPeriod && dayPeriod !== "none" && { dayPeriod }),
    ...(hour12 && { hour12 }),
    ...(timeZone && timeZone.timeZone
      ? { timeZone: timeZone.timeZone }
      : undefined),
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
                  onChange={(e) =>
                    dispatch({
                      type: "update-option",
                      payload: {
                        option: "locale",
                        value: e.target.value,
                      },
                    })
                  }
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
                onChange={(e, value) =>
                  value &&
                  dispatch({
                    type: "update-option",
                    payload: {
                      option: "timeZone",
                      value,
                    },
                  })
                }
                renderInput={(params) => (
                  <TextField {...params} variant="filled" label="Timezone" />
                )}
              />
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      value={hour12}
                      onChange={(e) =>
                        dispatch({
                          type: "update-option",
                          payload: {
                            option: "hour12",
                            value: e.target.checked,
                          },
                        })
                      }
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
                    helperText="The date formatting style to use when calling format()."
                    value={dateStyle}
                    onChange={(e) =>
                      dispatch({
                        type: "update-option",
                        payload: {
                          option: "dateStyle",
                          value: e.target.value,
                        },
                      })
                    }
                    options={[...DATE_STYLES, "none"]}
                  />

                  <RadioGroup
                    label="Time style"
                    helperText="The time formatting style to use when calling format()."
                    value={timeStyle}
                    onChange={(e) =>
                      dispatch({
                        type: "update-option",
                        payload: {
                          option: "timeStyle",
                          value: e.target.value,
                        },
                      })
                    }
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
                    helperText={`The formatting style used for day periods like "in the morning", "am", "noon", "n" etc.`}
                    value={dayPeriod}
                    onChange={(e) =>
                      dispatch({
                        type: "update-option",
                        payload: {
                          option: "dayPeriod",
                          value: e.target.value,
                        },
                      })
                    }
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
                    helperText="The representation of the weekday."
                    value={weekday}
                    onChange={(e) =>
                      dispatch({
                        type: "update-option",
                        payload: {
                          option: "weekday",
                          value: e.target.value,
                        },
                      })
                    }
                    options={[...WEEK_DAYS, "none"]}
                  />

                  <RadioGroup
                    label="Era"
                    helperText="The representation of the era."
                    value={era}
                    onChange={(e) =>
                      dispatch({
                        type: "update-option",
                        payload: {
                          option: "era",
                          value: e.target.value,
                        },
                      })
                    }
                    options={[...ERAS, "none"]}
                  />
                  <RadioGroup
                    label="Year"
                    helperText="The representation of the year."
                    value={year}
                    onChange={(e) =>
                      dispatch({
                        type: "update-option",
                        payload: {
                          option: "year",
                          value: e.target.value,
                        },
                      })
                    }
                    options={[...YEARS, "none"]}
                  />
                  <RadioGroup
                    label="Month"
                    helperText="The representation of the month."
                    value={month}
                    onChange={(e) =>
                      dispatch({
                        type: "update-option",
                        payload: {
                          option: "month",
                          value: e.target.value,
                        },
                      })
                    }
                    options={[...MONTHS, "none"]}
                  />
                  <RadioGroup
                    label="Day"
                    helperText="The representation of the day."
                    value={day}
                    onChange={(e) =>
                      dispatch({
                        type: "update-option",
                        payload: {
                          option: "day",
                          value: e.target.value,
                        },
                      })
                    }
                    options={[...DAYS, "none"]}
                  />
                  <RadioGroup
                    label="Hour"
                    helperText="The representation of the hour."
                    value={hour}
                    onChange={(e) =>
                      dispatch({
                        type: "update-option",
                        payload: {
                          option: "hour",
                          value: e.target.value,
                        },
                      })
                    }
                    options={[...HOURS, "none"]}
                  />
                  <RadioGroup
                    label="Minute"
                    helperText="The representation of the minute."
                    value={minute}
                    onChange={(e) =>
                      dispatch({
                        type: "update-option",
                        payload: {
                          option: "minute",
                          value: e.target.value,
                        },
                      })
                    }
                    options={[...MINUTES, "none"]}
                  />
                  <RadioGroup
                    label="Second"
                    helperText="The representation of the second."
                    value={second}
                    onChange={(e) =>
                      dispatch({
                        type: "update-option",
                        payload: {
                          option: "second",
                          value: e.target.value,
                        },
                      })
                    }
                    options={[...SECONDS, "none"]}
                  />
                  <RadioGroup
                    label="Fractional Second Digits"
                    helperText="The number of digits used to represent fractions of a second (any additional digits are truncated)."
                    value={fractionalSecondDigits}
                    onChange={(e) =>
                      dispatch({
                        type: "update-option",
                        payload: {
                          option: "fractionalSecondDigits",
                          value:
                            e.target.value === "none"
                              ? e.target.value
                              : Number(e.target.value),
                        },
                      })
                    }
                    options={[...FRACTIONAL_SECOND_DIGITS, "none"]}
                  />
                </AccordionDetails>
              </Accordion>
            </Stack>
            <Stack
              width="50%"
              justifyContent="space-between"
              spacing={1}
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

              <CodeSnippet code={codeSnippet} />
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </SnackbarProvider>
  );
}

export default DateTimeFormat;
