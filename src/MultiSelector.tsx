import React from "react";
import {
  Chip,
  FormControl,
  FormControlProps,
  InputLabel,
  Select,
  Typography
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { HighlightOffTwoTone } from "@material-ui/icons";
import {
  Controller,
  UseControllerProps,
  UseFormRegister,
  UseFormSetValue
} from "react-hook-form";

import { Name } from "./data";

const useStyles = makeStyles((theme) =>
  createStyles({
    chip: {
      marginBottom: "3px",
      paddingTop: "5px",
      borderRadius: "8px"
    },
    chipIcon: {
      paddingBottom: "5px"
    },
    chipLabel: {
      lineHeight: "0",
      fontWeight: "bold",
      fontSize: "0.7rem",
      paddingTop: "6px"
    },
    chipSublabel: {
      lineHeight: "1",
      fontSize: "0.6rem"
    }
  })
);

type FormSelectorProps<T> = {
  label: string;
  register: UseFormRegister<any>;
  required: boolean;
  handleChange?: (value: T[]) => void;
  setValue: UseFormSetValue<any>;
  children: React.ReactNode;
};

type MultiSelectorProps<T> = FormControlProps &
  FormSelectorProps<T> &
  UseControllerProps;

function MultiSelector<T>({
  label,
  control,
  register,
  required,
  defaultValue,
  setValue,
  children,
  ...rest
}: MultiSelectorProps<T>) {
  const classes = useStyles();

  const handleDelete = (event: any) => () => {
    const name = event as Name;
    console.log(`Deleting: ${name.last}`);
  };

  const renderChip = (value: Array<Name>) => (
    <>
      {value.map((name) => (
        <Typography component="div" key={name.id}>
          <Chip
            className={classes.chip}
            label={
              <Typography component="div">
                <Typography
                  className={classes.chipLabel}
                  variant="body2"
                  color="textPrimary"
                >
                  {name.last}
                </Typography>
                <Typography
                  className={classes.chipSublabel}
                  variant="caption"
                  color="secondary"
                >
                  {name.first}
                </Typography>
              </Typography>
            }
            deleteIcon={<HighlightOffTwoTone className={classes.chipIcon} />}
            onDelete={handleDelete(name)}
            onMouseDown={(e) => e.stopPropagation()}
          />
        </Typography>
      ))}
    </>
  );

  return (
    <div>
      <FormControl fullWidth {...rest}>
        <InputLabel id="test-mutiple-chip-label">{label}</InputLabel>
        <Controller
          name="selector"
          control={control}
          defaultValue={defaultValue}
          render={({ field: { onChange, value } }) => (
            <Select
              multiple
              {...register(label, { required })}
              label={label}
              value={value}
              renderValue={(value) => renderChip(value as Name[])}
              onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
                onChange(e.target.value);
                setValue("Names", e.target.value);
              }}
            >
              {children}
            </Select>
          )}
        />
      </FormControl>
    </div>
  );
}

export default MultiSelector;
