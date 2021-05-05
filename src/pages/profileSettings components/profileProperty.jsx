import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
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

  const onValueChange = (event) => {
    props.handleChange(event.target.value);
    event.preventDefault();
  };

  if (props.id === "שם משתמש") {
    return (
      <FormControl className={classes.margin}>
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
      <div>
        <FormControl className={classes.margin}>
          <NativeSelect
            id="demo-customized-select-native"
            value={props.userValue}
            onChange={onValueChange}
            input={<BootstrapInput />}
          >
            <option value="" disabled>
              {props.userValue}
            </option>
            <option aria-label="None" value="" />
            {props.data.map((possability) => {
              return (
                <option key={possability.id} value={possability.name}>
                  {possability.name}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>
      </div>
    );
}
