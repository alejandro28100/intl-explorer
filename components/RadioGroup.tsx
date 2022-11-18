import {
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup as MUIRadioGroup,
  RadioGroupProps,
} from "@mui/material";

interface IRadioGroupProps {
  label: string;
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
}: IRadioGroupProps) {
  return (
    <FormControl>
      {label && <FormLabel>{label}</FormLabel>}
      <MUIRadioGroup row value={value} onChange={onChange}>
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
