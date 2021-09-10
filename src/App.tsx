import React from "react";
import { useForm } from "react-hook-form";
import MultiSelector from "./MultiSelector";
import { Button, Grid, MenuItem, Typography } from "@material-ui/core";

import "./styles.css";
import { names } from "./data";

export default function App() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState
  } = useForm({
    mode: "onChange"
  });

  const onSubmit = (data: any) => {
    console.log("Submit", data);
  };

  const onCancel = () => {};

  return (
    <div className="App">
      <h1>MultiSelector </h1>
      <h2>Using React-Hook-Form, Material-UI</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction="column" justifyContent="center" spacing={3}>
          <Grid item xs={4}>
            <MultiSelector
              name="Names"
              label="Names"
              control={control}
              register={register}
              setValue={setValue}
              defaultValue={[]}
              required
              variant="outlined"
            >
              {names.map((name) => (
                <MenuItem key={name.id} value={name as any}>
                  <Typography component="div">
                    <Typography variant="subtitle1" color="primary">
                      {name.last}
                    </Typography>
                    <Typography variant="subtitle1" color="secondary">
                      {name.first}
                    </Typography>
                  </Typography>
                </MenuItem>
              ))}
            </MultiSelector>
            <Grid container direction="row" alignContent="space-between">
              <Grid item xs={6}>
                <Button variant="outlined" onClick={onCancel}>
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button type="submit" color="primary" variant="contained">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
