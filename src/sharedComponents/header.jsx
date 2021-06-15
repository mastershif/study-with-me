import styled from 'styled-components';
import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Button, IconButton,
    Paper, List, ListItem} from '@material-ui/core';
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from '@material-ui/icons/Add';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import MobileMenu from "./mobileMenu";
import {getImageFromLocalStorage, removeImageFromLocalStorage} from '../localStorage.service'
import {GoogleLogout} from "react-google-login";
import {useHistory} from "react-router-dom";
import logo from "../assets/logo.png";


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
    logo: {
        flexGrow: 1,
        maxHeight: '85px',
    },
    img: {
        maxHeight: '70px',
        [theme.breakpoints.down("xs")]: {
            maxWidth: '220px'
        },
    },
    buttonsBar: {
        [theme.breakpoints.down("xs")]: {
            display: 'none',
        },
        maxHeight: '85px',
        minWidth: '200px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
}));

const Header = ({isLoggedIn, setIsLoggedIn}) => {
    const [showLogout, setShowLogout] = useState(false);
    let profilePicture = isLoggedIn ? getImageFromLocalStorage() : "";

    const classes = useStyles();
    const history = useHistory();

    const onLogoutGoogle = async (response) => {
        await fetch("http://localhost:5000/signOut", {
            credentials: "include",
        })
            .catch((error) => console.log(error));
        removeImageFromLocalStorage();
        setIsLoggedIn(false);
        history.push('/');
        console.log("logged out");
    };

    const onLogoutGoogleFailure = (response) => {
        console.log(response);
        console.log("failed to log out");
    };

    const renderLogoutMenu = () => {
        return (
            <Paper elevation={0} style={{ zIndex: 1, position: 'absolute',
                minWidth: '80px', marginTop: '4rem', marginRight: '130px' }}>
                <List>
                    {['יציאה'].map((text) => (
                        <ListItem button key={text}>
                            <GoogleLogout
                                clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}
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
                <Toolbar style={{maxHeight: '80px', minHeight: '80px'}}>
                    <IconButton className={classes.menuButton} aria-label="menu" color="inherit">
                        <MobileMenu isLoggedIn={isLoggedIn} onLogoutGoogle={onLogoutGoogle}
                                    onLogoutGoogleFailure={onLogoutGoogleFailure}/>
                    </IconButton>
                    <div className={classes.logo} >
                        <IconButton href="/" color={"primary"}>
                            <img src={logo} alt={"Study With Me"} className={classes.img} />
                        </IconButton>
                    </div>
                    <div className={classes.buttonsBar}>
                        <IconButton className={classes.iconButton} aria-label="search" color="inherit" href="/search">
                            <SearchIcon />
                        </IconButton>
                        {isLoggedIn ? <IconButton className={classes.iconButton} aria-label="create" color="inherit" href="/createGroup"> <AddIcon /> </IconButton> : <div></div>}
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
