import styled from 'styled-components';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import appTheme from "../styles/theme";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from '@material-ui/icons/Add';

const Logo = styled.a`
  color: ${appTheme.palette.secondary.main};
  line-height: 1.15;
  font-size: 3rem;
  font-weight: 500;
  font-style: italic;
  text-decoration: none;
  font-family: 'Permanent Marker', cursive;
  margin-right: 0.75em;
`;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    textButton: {
        fontSize: 20,
    },
    iconButton: {
        fontSize: 20,
    },
    title: {
        flexGrow: 1,
    },
}));

const Header = () => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar color={"transparent"} position="static" elevation={0}>
                <Toolbar>
                    <div className={classes.title}>
                        <Logo edge="start" href="/">Study With Me</Logo>
                    </div>
                    <Button className={classes.textButton} color="inherit" href="/signIn">התחברות / הרשמה</Button>
                    <IconButton className={classes.iconButton} aria-label="search" color="inherit" href="/search">
                        <SearchIcon />
                    </IconButton>
                    <IconButton className={classes.iconButton} aria-label="create" color="inherit" href="/createGroup">
                        <AddIcon />
                    </IconButton>
                    <IconButton className={classes.iconButton} aria-label="profile" color="inherit" href="/profile">
                        <PersonOutlineIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;
