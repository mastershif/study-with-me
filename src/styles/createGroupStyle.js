import styled from "styled-components";
import theme from "../styles/theme";
import {makeStyles} from "@material-ui/core/styles";

//This file contains some styles for the "create-group" page.
//Using makeStyles from material-ui and styled-components.

export const useStyles = makeStyles(theme => ({
    page: {
        marginTop: theme.spacing(3),
    },
    card: {
        width: '95%',
        '@media (min-width:650px)': {
            width: '50%'
        },
        margin: "auto",
    }
}))

export const Label = styled.label`
  line-height: 1.5;
  display: block;
  margin-top: 10px;
  font-size: 14px;
  font-weight: 400;
`;

export const Text = styled.p`
  line-height: 1.5;
  display: block;
  font-size: 14px;
  font-weight: 500;
`;

export const Warning = styled.p`
  line-height: 1.5;
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: ${theme.palette.secondary.main};
`;

export const FinishForm = styled.label`
  line-height: 1.5;
  display: block;
  font-size: 26px;
  font-weight: 500;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;
