import React from "react";
import { useForm } from "react-hook-form";
import MultiSelector from "./MultiSelector";
import { Box, Button, Grid, MenuItem, Typography } from "@material-ui/core";

import "./styles.css";
import { names, Name } from "./data";

export default function App() {
  const { handleSubmit, control, setValue, getValues, formState } = useForm({
    mode: "onChange"
  });

  const [formData, setFormData] = React.useState<Name[]>([]);

  const onSubmit = (data: any) => {
    console.log("Submit", data);
    setFormData(data);
  };

  const onCancel = () => {};

  return (
    <div className="App">
      <h1>MultiSelector with Chips </h1>
      <h2>Using React-Hook-Form, Material-UI</h2>

      <Box display="flex" justifyContent="center">
        <Box className="centered">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box m={1}>
              <MultiSelector
                name="Names"
                label="Names"
                control={control}
                setValue={setValue}
                getValues={getValues}
                defaultValue={[]}
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
              <Box m={1}>
                <Button variant="outlined" onClick={onCancel}>
                  Cancel
                </Button>
              </Box>
              <Box m={1}>
                <Button type="submit" color="primary" variant="contained">
                  Submit
                </Button>
              </Box>
            </Box>
          </form>
          <Box mt={4} display="flex" justifyContent="center">
            <p>
              <pre>{JSON.stringify(formData, undefined, 2)}</pre>
            </p>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
