import React from "react";
import {
  Typography,
  Stack,
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
import Layout from "components/Layout";

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
  locale: [string, string];
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
  locale: [
    // locale code
    "",
    // locale name
    "",
  ],
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
    case "update-option": {
      const { option, value } = action.payload;

      const isFastFormattingOption = ["dateStyle", "timeStyle"].includes(
        option
      );

      const isCommonOption = ["locale", "hour12", "timeZone", "date"].includes(
        option
      );
      // These options can be used with any of the available options
      // so we can just update the state wihout afecting the other options
      if (isCommonOption) {
        return {
          ...state,
          [option]: value,
        };
      }

      // Given that dateStyle and timeStyle must be used together and
      // they cannot be used with certain other options, we need to reset those.

      // We need to preserve the value of the options that can be used along
      // with dateStyle and timeStyle (locale, hour12, timeZone)
      if (isFastFormattingOption) {
        return {
          ...initialState,
          locale: state.locale,
          hour12: state.hour12,
          timeZone: state.timeZone,
          dateStyle: option === "dateStyle" ? value : state.dateStyle,
          timeStyle: option === "timeStyle" ? value : state.timeStyle,
        };
      }

      // At this point dateStyle or timeStyle are not being changed so
      // we have to set their values to "none" to prevent the .format() method
      // from throwing an error if the user has selected them before.

      return {
        ...state,
        dateStyle: "none",
        timeStyle: "none",
        [option]: action.payload.value,
      };
    }
    default:
      return state;
  }
}

function DateTimeFormat() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const {
    date,
    locale: [localeCode],
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
  } = state;

  const formattedDate = new Intl.DateTimeFormat(localeCode || undefined, {
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

    const detectedLocale = LOCALES.find(
      (locale) => locale[0] === deviceLanguage
    );
    console.log({ detectedLocale });
    if (detectedLocale) {
      dispatch({
        type: "update-option",
        payload: {
          option: "locale",
          value: detectedLocale,
        },
      });
    }
  }, []);

  // This useEffect will set a timeout to update the date
  // if needed. In case the user selects an option that
  // requires the date to be updated every certain amount of time
  // (like milisecond, second, minute etc) we will set a timeout
  // to update the date.
  React.useEffect(() => {
    // If there's no time option selected we don't need to update the date
    // because the time will not be rendered on the screen, so we can just
    // return and not set a timeout.
    if (
      timeStyle === "none" &&
      fractionalSecondDigits === "none" &&
      second === "none" &&
      minute === "none" &&
      hour === "none"
    )
      return;

    const seconds = fractionalSecondDigits !== "none" ? 0.001 : 1;
    const interval = seconds * 1000;

    // Update the date inmediately
    dispatch({
      type: "update-option",
      payload: {
        option: "date",
        value: new Date(),
      },
    });
    // Set the timer to update the date based on the selected options
    const timer = setInterval(() => {
      dispatch({
        type: "update-option",
        payload: {
          option: "date",
          value: new Date(),
        },
      });
    }, interval);
    return () => clearInterval(timer);
  }, [fractionalSecondDigits, second, minute, hour, day, timeStyle]);

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
  const codeSnippet = `new Intl.DateTimeFormat("${localeCode}"${optionsSnippet})\n.format( new Date() )`;

  // Add the firstLetter field to each timezone
  // This is used to group the timezones by the first letter
  const timezoneOptions = TIMEZONES.map((timeZone) => ({
    timeZone,
    firstLetter: timeZone[0].toUpperCase(),
  }));

  function handleRadioGroupChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    if (name === "fractionalSecondDigits") {
      return dispatch({
        type: "update-option",
        payload: {
          option: "fractionalSecondDigits",
          value: value === "none" ? "none" : Number(value),
        },
      });
    }
    dispatch({
      type: "update-option",
      payload: {
        option: name,
        value,
      },
    });
  }

  function handleAutocompleteChange(name: string) {
    return (value: any) =>
      // We need to check if the value exists
      // because the Autocomplete component will
      // call this function with undefined when
      // the user clears the input or when the user
      // deletes the text in the input.

      value &&
      dispatch({
        type: "update-option",
        payload: {
          option: name,
          value,
        },
      });
  }

  return (
    <SnackbarProvider>
      <Layout
        sx={{
          spacing: 2,
          justifyContent: "space-evenly",
          flexDirection: ["column", "row"],
        }}
      >
        <Stack sx={{ overflowY: "auto", px: 0.5, pr: 2 }} flex="1" spacing={2}>
          <Typography component="h1" variant="h6">
            DateTimeFormat
          </Typography>
          <Typography variant="body1">
            Explore the multiple options of the Intl.DateTimeFormat API to see
            how the date is formatted.
          </Typography>

          <Autocomplete
            value={state.locale}
            options={LOCALES}
            isOptionEqualToValue={(option, value) => option[0] === value[0]}
            groupBy={([, name]) => name[0].toUpperCase()}
            getOptionLabel={(option) => option[1]}
            onChange={(event, value) =>
              handleAutocompleteChange("locale")(value)
            }
            renderInput={(params) => (
              <TextField
                {...params}
                name="locale"
                variant="outlined"
                size="small"
                label="Locale"
              />
            )}
          />

          <Autocomplete
            value={timeZone}
            options={timezoneOptions}
            isOptionEqualToValue={(option, value) =>
              option.timeZone === value.timeZone
            }
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.timeZone}
            onChange={(event, value) =>
              handleAutocompleteChange("timeZone")(value)
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                size="small"
                label="Timezone"
              />
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
                name="dateStyle"
                label="Date style"
                helperText="The date formatting style to use when calling format()."
                value={dateStyle}
                onChange={handleRadioGroupChange}
                options={[...DATE_STYLES, "none"]}
              />

              <RadioGroup
                name="timeStyle"
                label="Time style"
                helperText="The time formatting style to use when calling format()."
                value={timeStyle}
                onChange={handleRadioGroupChange}
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
                name="dayPeriod"
                helperText={`The formatting style used for day periods like "in the morning", "am", "noon", "n" etc.`}
                value={dayPeriod}
                onChange={handleRadioGroupChange}
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
                name="weekday"
                helperText="The representation of the weekday."
                value={weekday}
                onChange={handleRadioGroupChange}
                options={[...WEEK_DAYS, "none"]}
              />

              <RadioGroup
                label="Era"
                name="era"
                helperText="The representation of the era."
                value={era}
                onChange={handleRadioGroupChange}
                options={[...ERAS, "none"]}
              />
              <RadioGroup
                label="Year"
                name="year"
                helperText="The representation of the year."
                value={year}
                onChange={handleRadioGroupChange}
                options={[...YEARS, "none"]}
              />
              <RadioGroup
                label="Month"
                name="month"
                helperText="The representation of the month."
                value={month}
                onChange={handleRadioGroupChange}
                options={[...MONTHS, "none"]}
              />
              <RadioGroup
                label="Day"
                name="day"
                helperText="The representation of the day."
                value={day}
                onChange={handleRadioGroupChange}
                options={[...DAYS, "none"]}
              />
              <RadioGroup
                label="Hour"
                name="hour"
                helperText="The representation of the hour."
                value={hour}
                onChange={handleRadioGroupChange}
                options={[...HOURS, "none"]}
              />
              <RadioGroup
                label="Minute"
                name="minute"
                helperText="The representation of the minute."
                value={minute}
                onChange={handleRadioGroupChange}
                options={[...MINUTES, "none"]}
              />
              <RadioGroup
                label="Second"
                name="second"
                helperText="The representation of the second."
                value={second}
                onChange={handleRadioGroupChange}
                options={[...SECONDS, "none"]}
              />
              <RadioGroup
                label="Fractional Second Digits"
                name="fractionalSecondDigits"
                helperText="The number of digits used to represent fractions of a second (any additional digits are truncated)."
                value={fractionalSecondDigits}
                onChange={handleRadioGroupChange}
                options={[...FRACTIONAL_SECOND_DIGITS, "none"]}
              />
            </AccordionDetails>
          </Accordion>
        </Stack>
        <Stack
          justifyContent="space-between"
          spacing={1}
          sx={{
            width: ["100%", "100%", "50%"],
            flex: 1,
            overflowY: "auto",
            px: 0.5,
            pr: 2,
            maxHeight: "80vh",
          }}
        >
          <Stack
            alignItems="center"
            sx={{
              position: ["fixed", "initial"],
              zIndex: [20, "initial"],
              bottom: 0,
              left: 0,
              width: "100%",
              backgroundColor: ["background.paper", "initial"],
              p: [1, 0],
              borderRadius: ["8px 8px 0px 0px", 0],
            }}
          >
            <Typography
              align="center"
              sx={{
                fontSize: ["1.5rem", "2rem", "2.5rem"],
              }}
            >
              {formattedDate}
            </Typography>
          </Stack>

          <CodeSnippet code={codeSnippet} />
        </Stack>
      </Layout>
    </SnackbarProvider>
  );
}

export default DateTimeFormat;
