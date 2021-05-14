import { FormControl, TextField } from "@material-ui/core";
import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import { Autocomplete } from "@material-ui/lab";
import InputBase from "@material-ui/core/InputBase";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function CustomizedSelects(props) {
  const classes = useStyles();

  const defaultProps = {
    options: props.data,
    getOptionLabel: (option) => option.name,
  };

  const onValueChange = (newValue) => {
    props.handleChange(newValue);
  };

  if (props.id === "שם משתמש") {
    return (
      <FormControl className={classes.margin} style={{ width: 230 }}>
        <InputLabel htmlFor="username">{props.id}</InputLabel>
        <BootstrapInput
          id="username"
          placeholder={props.userValue}
          onChange={onValueChange}
        />
      </FormControl>
    );
  } else
    return (
      <div style={{ width: 230 }}>
        <Autocomplete
          {...defaultProps}
          id={props.id}
          fullWidth
          onChange={(option, value) => {
            if (value !== null) {
              onValueChange(value.name);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              margin="normal"
              placeholder={props.userValue}
            />
          )}
        />
      </div>
    );
}
