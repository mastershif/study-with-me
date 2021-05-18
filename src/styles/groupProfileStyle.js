import styled from "styled-components";
import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
    root: {
        width: 250,
        height: 250,
        margin: theme.spacing(1),
        textAlign: 'center',
        border: '1.5px solid',
        borderRadius: '7px',
        borderColor: theme.palette.primary.main,
        "&:hover, &:focus": {
            boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)'
        }
    },
    moreInfo: {
        position: 'absolute',
        bottom: theme.spacing(3),
        left: theme.spacing(10)
    },
    adminIcon: {
        position: 'absolute',
        bottom: theme.spacing(3.5),
        left: theme.spacing(25.5),
        color: theme.palette.success.main,
    },
    userIcon: {
        position: 'absolute',
        bottom: theme.spacing(3.5),
        left: theme.spacing(25.5),
        color: theme.palette.primary.dark,
    }
}))

export const Title = styled.h2`
  display: flex;
  margin: auto;
  line-height: 1.25rem;
  font-size: 15px;
`;

export const CardRow = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

export const Text = styled.p`
  display: flex;
  margin: 1px 5px 0 0;
  font-size: 14px;
`;