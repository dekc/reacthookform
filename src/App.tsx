import React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography
} from "@material-ui/core";

import MultiSelector from "./MultiSelector";
import AutoCompleter from "./AutoCompleter";
import "./styles.css";
import { names, Name, OPTIONS } from "./data";

export default function App() {
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    register,
    formState: { errors }
  } = useForm({
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
          <Box m={1}>
            <TextField
              label="Description"
              variant="outlined"
              multiline
              fullWidth
              {...register("Description", {
                required: "Description cannot be empty"
              })}
            />

            {errors.Description?.type === "required" && (
              <Typography color="secondary">
                {errors.Description.message}
              </Typography>
            )}
          </Box>
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
            <Box m={1}>
              <AutoCompleter
                name="Places"
                label="Places"
                control={control}
                setValue={setValue}
                getValues={getValues}
                options={OPTIONS}
                defaultValue={OPTIONS[10]}
                required
                variant="outlined"
                fullWidth
              />
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
