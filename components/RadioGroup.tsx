import {
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup as MUIRadioGroup,
  RadioGroupProps,
  FormHelperText,
} from "@mui/material";

interface IRadioGroupProps extends RadioGroupProps {
  label: string;
  helperText?: string;
  value: RadioGroupProps["value"];
  onChange: RadioGroupProps["onChange"];
  options: TRadioGroupOptions[] | readonly (number | string)[];
}

type TRadioGroupOptions = {
  label?: string;
  value: string;
  id?: string;
};

function RadioGroup({
  label,
  value,
  onChange,
  options = [],
  helperText,
  ...rest
}: IRadioGroupProps) {
  return (
    <FormControl>
      {label && <FormLabel>{label}</FormLabel>}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}

      <MUIRadioGroup {...rest} row value={value} onChange={onChange}>
        {options.length > 0 &&
          options.map((option) =>
            typeof option !== "object" ? (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio />}
                label={option}
              />
            ) : (
              <FormControlLabel
                key={option.id || option.value}
                value={value}
                control={<Radio />}
                label={option.label || option.value}
              />
            )
          )}
      </MUIRadioGroup>
    </FormControl>
  );
}

export default RadioGroup;
