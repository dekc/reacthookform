import React from "react";
import { useForm } from "react-hook-form";
import MultiSelector from "./MultiSelector";
import { Box, Button, MenuItem, Typography } from "@material-ui/core";

import "./styles.css";
import { names } from "./data";

const defaultNames: any = [];
defaultNames.push(names[0]);
defaultNames.push(names[9]);

export default function App() {
  const { handleSubmit, control, setValue, getValues } = useForm({
    mode: "onChange"
  });

  const onSubmit = (data: any) => {
    console.log("Submit", data);
  };

  const onCancel = () => {};

  return (
    <div className="App">
      <h1>MultiSelector with Chips </h1>
      <h2>Using React-Hook-Form, Material-UI</h2>
      <Box display="flex" justifyContent="center" flexWrap="nowrap">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <Grid container direction="row" justifyContent="center" spacing={1}> */}
          <Box m width={2 / 3}>
            <MultiSelector
              name="Names"
              label="Names"
              control={control}
              setValue={setValue}
              getValues={getValues}
              defaultValue={defaultNames}
              required
              variant="outlined"
              fullWidth
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
          </Box>
          <Box display="flex" justifyContent="center">
            <Box m>
              <Button variant="outlined" onClick={onCancel}>
                Cancel
              </Button>
            </Box>
            <Box m>
              <Button type="submit" color="primary" variant="contained">
                Submit
              </Button>
            </Box>
          </Box>
          {/* </Grid> */}
        </form>
      </Box>
    </div>
  );
}
