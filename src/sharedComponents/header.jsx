import styled from 'styled-components';
import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import appTheme from "../styles/theme";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from '@material-ui/icons/Add';
import MobileMenu from "./mobileMenu";
import {getUserFromLocalStorage, removeUserFromLocalStorage} from '../localStorage.service'
import {GoogleLogout} from "react-google-login";
import {useHistory} from "react-router-dom";
import {Paper} from "@material-ui/core";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const Logo = styled.a`
  color: ${appTheme.palette.background.default};
  line-height: 1.15;
  font-weight: 500;
  font-style: italic;
  text-decoration: none;
  font-family: 'Permanent Marker', cursive;
  margin-right: 0.5em;
  text-shadow: 0 0 6px ${appTheme.palette.secondary.main}, 0 0 9px ${appTheme.palette.secondary.main};
`;

const ProfilePic = styled.img`
  width: 45px;
  height: 45px;
  border: white;
  border-radius: 50%;
`;

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
    signOutButton: {
        fontSize: 20,
        color: "1d1d1f",
        cursor: "pointer",
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
        height: '50px',
        minWidth: '200px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
}));

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
    const [showLogout, setShowLogout] = useState(false);
    const profilePicture = getUserFromLocalStorage()?.imageUrl;

    const classes = useStyles();
    const history = useHistory();

    const onLogoutGoogle = (response) => {
        removeUserFromLocalStorage();
        setIsLoggedIn(false);
        history.push('/');
        console.log(response);
        console.log("logged out");
    };

    const onLogoutGoogleFailure = (response) => {
        console.log(response);
        console.log("failed to log out");
    };

    const renderLogoutMenu = () => {
        return (
            <Paper elevation={0} style={{ zIndex: 1, position: 'absolute', minWidth: '80px', marginTop: '4rem', marginRight: '130px' }}>
                <List>
                    {['יציאה'].map((text, index) => (
                            <ListItem button key={text}>
                                <GoogleLogout
                                    clientId={
                                        "101612216779-7o7aqog0rj9vopdu7ffukfs67i6n4ba7.apps.googleusercontent.com"
                                    }
                                    onLogoutSuccess={onLogoutGoogle}
                                    onFailure={onLogoutGoogleFailure}
                                    render={renderProps => (
                                        <button className={classes.signOutButton} onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                            יציאה
                                        </button>
                                    )}
                                />
                            </ListItem>
                    ))}
                </List>
            </Paper>
        )
    }

    return (
        <div className={classes.root}>
            <AppBar color={"primary"} position="static" elevation={1}>
                <Toolbar>
                    <IconButton className={classes.menuButton} aria-label="menu" color="inherit">
                        <MobileMenu isLoggedIn={isLoggedIn}/>
                    </IconButton>
                    <div className={classes.title}>
                        <Logo edge="start" href="/">Study With Me</Logo>
                    </div>
                    <div className={classes.buttonsBar}>
                        <IconButton className={classes.iconButton} aria-label="search" color="inherit" href="/search">
                            <SearchIcon />
                        </IconButton>
                        {isLoggedIn ? <IconButton className={classes.iconButton} aria-label="create" color="inherit" href="/createGroup"> <AddIcon /> </IconButton> :<div></div>}
                        {!isLoggedIn &&
                            <Button className={classes.textButton} color="inherit" href="/signIn">
                                התחבר/י
                            </Button>
                        }
                        {isLoggedIn ?
                            <>
                                <IconButton className={classes.iconButton} aria-label="profile" color="inherit" href="/profile">
                                    <ProfilePic src={profilePicture}/>
                                </IconButton>
                                <IconButton color="inherit" onClick={() => setShowLogout(!showLogout)}>
                                    <ArrowDropDownIcon />
                                </IconButton>
                                {showLogout && renderLogoutMenu()}
                            </>
                            : <div></div>}
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;
