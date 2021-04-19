import styled from "styled-components";
import theme from "../styles/theme";
import {makeStyles} from "@material-ui/core/styles";

//This file contains some styles for the "create-group" page.
//Using makeStyles from material-ui and styled-components.

export const useStyles = makeStyles(theme => ({
    page: {
        margin: theme.spacing(3),
    },
    root: {
        '& .MuiFormControl-root': {
            width: '90%',
            margin: theme.spacing(0.5)
        }
    },
    select: {
        minWidth: "70%",
        maxWidth: "70%"
    },
    checkboxGroup: {
        width: "fit-content",
        margin: "10px 0 0 5px"
    },
    checkbox: {
        marginBottom: "5px"
    },
    buttonGroup: {
        margin: "10px 0 0 5px"
    }
}))

export const Title = styled.h1`
  margin: 0 0 5px;
  line-height: 3.5rem;
  font-size: xx-large;
  font-weight: bold;
  border-bottom: 1px solid ${theme.palette.primary.main};
`;

export const Label = styled.label`
  line-height: 1.5;
  display: block;
  margin: 20px 5px 0;
  font-size: 18px;
  font-weight: 400;
`;

export const Text = styled.p`
  line-height: 1.5;
  display: block;
  margin: 5px 5px 10px;
  font-size: 15px;
  font-weight: 400;
`;

export const Warning = styled.p`
  line-height: 1.5;
  display: block;
  margin: 5px 5px 0;
  font-size: 14px;
  font-weight: 500;
  color: ${theme.palette.secondary.main};
`;
