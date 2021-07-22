import {makeStyles} from "@material-ui/core/styles";
import styled from "styled-components";


export const useStyles = makeStyles(theme => ({
    page: {
        margin: theme.spacing(3),
        backgroundColor: theme.palette.background.default
    },
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
