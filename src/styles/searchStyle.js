import {makeStyles} from "@material-ui/core/styles";
import styled from "styled-components";


export const useStyles = makeStyles(theme => ({
    page: {
        margin: theme.spacing(3),
        backgroundColor: theme.palette.background.default
    },
    root: {
        '& .MuiFormControl-root': {
            width: '90%',
            margin: theme.spacing(0.5),
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    whiteBackground: {
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '10px',
    },
    noBackground: {
        padding: '1rem',
        borderRadius: '10px',
    },
}))

export const Title = styled.h1`
  margin: 0;
  line-height: 1.5rem;
  font-size: xx-large;
  font-weight: bold;
  padding: 1rem;
`;

export const MiniTitle = styled.div`
  line-height: 2.5rem;
  font-size: large;
  font-weight: bold;
`;

export const Label = styled.label`
  line-height: 1.5;
  display: block;
  margin-top: 10px;
  font-size: 14px;
  font-weight: 400;
`;

export const GroupsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;