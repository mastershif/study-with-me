import {makeStyles} from "@material-ui/core/styles";
import styled from "styled-components";
import theme from "../styles/theme";


export const useStyles = makeStyles(theme => ({
    page: {
        margin: theme.spacing(3),
        backgroundColor: theme.palette.background.default
    },
    formControl: {
        margin: theme.spacing(1),
    },
    whiteBackground: {
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '10px',
    },
    filtersButton: {
        marginTop: '15px',
        border: '1.5px solid grey'
    },
    resetButton: {
        marginTop: '15px',
        marginLeft: '15px',
        border: '1.5px solid grey',
    }
}))

export const Title = styled.h1`
  margin: 0;
  line-height: 1.5rem;
  font-size: xx-large;
  font-weight: bold;
  padding: 1rem;
`;

export const GroupsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const RangeSliderContainer = styled.div`
  .input-range__slider {
    background: ${theme.palette.primary.main};
    border-color: ${theme.palette.primary.main};
    margin: -9px 0 0 -8px;
    height: 12px;
    width: 12px;
  }
  .input-range__track--active {
    background: ${theme.palette.primary.main};
    border-color: ${theme.palette.primary.main};
    height: 4px;
  }
`;