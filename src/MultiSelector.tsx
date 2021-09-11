import React from "react";
import {
  Box,
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
  UseFormGetValues,
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
    },
    selectInput: {
      minWidth: "100%"
    }
  })
);

type FormSelectorProps<T> = {
  label: string;
  required: boolean;
  handleChange?: (value: T[]) => void;
  setValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
  children: React.ReactNode;
};

type MultiSelectorProps<T> = FormControlProps &
  FormSelectorProps<T> &
  UseControllerProps;

function MultiSelector<T>({
  name,
  label,
  control,
  required,
  defaultValue,
  setValue,
  getValues,
  children,
  ...rest
}: MultiSelectorProps<T>) {
  const classes = useStyles();

  const handleDelete = (event: any) => () => {
    const name = event as Name;
    let names = getValues("Names");
    console.log(`Deleting: ${name.last}`);
    console.log(`List of values: ${JSON.stringify(names)}`);
    names = names.filter((n: Name) => n.id !== name.id);
    console.log(`List of values: ${JSON.stringify(names)}`);
    setValue("Names", names);
  };

  const renderChip = (value: Array<Name>) => (
    <Box
      flexDirection="row"
      flexWrap="wrap"
      display="flex"
      alignItems="flex-start"
    >
      {value.map((name) => (
        <Box key={name.id} p={0.25}>
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
        </Box>
      ))}
    </Box>
  );

  return (
    <div>
      <FormControl {...rest}>
        <InputLabel id="test-mutiple-chip-label">{label}</InputLabel>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field: { onChange, value } }) => (
            <Select
              className={classes.selectInput}
              multiple
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
