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

import { DATE_STYLES, TIME_STYLES, LOCALES, CALENDAR } from "../../data";

type TDateStyle = "full" | "long" | "medium" | "short";
type TTimeStyle = "full" | "long" | "medium" | "short";

function DateTimeFormat() {
  const [date, setDate] = React.useState(new Date());
  const [locale, setLocale] = React.useState("en-US");
  const [dateStyle, setDateStyle] = React.useState<TDateStyle | undefined>();
  const [timeStyle, setTimeStyle] = React.useState<TTimeStyle | undefined>();

  const formattedDate = new Intl.DateTimeFormat(locale, {
    dateStyle,
    timeStyle,
  }).format(date);

  React.useEffect(() => {
    // Update the date every second
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Container maxWidth="md">
      <Stack spacing={2} py={4}>
        <Typography component="h1" variant="h3">
          DateTimeFormat
        </Typography>

        <Stack spacing={2}>
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Locale</InputLabel>
            <Select value={locale} onChange={(e) => setLocale(e.target.value)}>
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
        </Stack>

        <Typography variant="body1">{formattedDate}</Typography>
      </Stack>
    </Container>
  );
}

export default DateTimeFormat;
