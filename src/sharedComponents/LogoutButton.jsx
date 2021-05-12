import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import "../styles/GFStyle.css";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: 1
    },
    textButton: {
        fontSize: 20,
    },
    iconButton: {
        fontSize: 20,
    },
    menuButton: {
        fontSize: 20,
        display: 'none',
        [theme.breakpoints.down("xs")]: {
            display: 'inline',
        },
    },
    title: {
        flexGrow: 1,
        marginBottom: '4px',
        fontSize: '3rem',
        [theme.breakpoints.down("xs")]: {
            fontSize: '2rem',
        },
    },
    buttonsBar: {
        [theme.breakpoints.down("xs")]: {
            display: 'none',
        },
    }
}));


const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();
    const classes = useStyles();

    return (
        isAuthenticated && (
        <Button
            onClick={() => logout()}
            id="qsLoginBtn"
            variant="primary"
            color="inherit"
            className={classes.textButton}
            //className="loginBtn"
            >

                להתנתקות 
          </Button>
        )
    );
};

export default LogoutButton;