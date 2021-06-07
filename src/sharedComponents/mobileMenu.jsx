import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {Drawer, Button, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import MenuIcon from "@material-ui/icons/Menu";
import LockIcon from '@material-ui/icons/Lock';
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from '@material-ui/icons/Add';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import {Link} from "react-router-dom";
import {GoogleLogout} from "react-google-login";

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    link: {
        color: 'black',
        textDecoration: 'none',
    }
});

const MobileMenu = (props) => {

    const {isLoggedIn, onLogoutGoogle, onLogoutGoogleFailure} = props;
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const navigationOptions = isLoggedIn ?
        ['חיפוש קבוצה', 'יצירת קבוצה', 'פרופיל', 'יציאה'] : ['התחברות', 'חיפוש קבוצה'];
    const menuIcons = isLoggedIn ?
        [<SearchIcon />, <AddIcon />, <PersonOutlineIcon />, <LockIcon />] : [<LockIcon />, <SearchIcon />];
    const menuPaths = isLoggedIn ?
        ['/search', '/createGroup', '/profile'] : ['/signIn', '/search'];

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {navigationOptions.map((text, index) => (
                    <Link to={menuPaths[index]} key={index} className={classes.link}>
                        <List>
                            <ListItem button key={text}>
                                {(text !== 'יציאה') && (
                                    <>
                                        <ListItemIcon>
                                            {menuIcons[index]}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </>
                                )}
                                {(text === 'יציאה') && (
                                    <GoogleLogout
                                        clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}
                                        onLogoutSuccess={onLogoutGoogle}
                                        onFailure={onLogoutGoogleFailure}
                                        render={renderProps => (
                                            <button className={classes.signOutButton}
                                                    onClick={renderProps.onClick}
                                                    disabled={renderProps.disabled}>
                                                <ListItemIcon>
                                                    {menuIcons[index]}
                                                </ListItemIcon>
                                                <ListItemText primary={text} />
                                            </button>
                                        )}
                                    />
                                )}
                            </ListItem>
                        </List>
                    </Link>
                ))}
            </List>
        </div>
    );

    return (
        <React.Fragment key={'menu'}>
            <Button onClick={toggleDrawer('menu', true)} color="inherit">
                <MenuIcon />
            </Button>
            <Drawer anchor={'menu'} open={state['menu']} onClose={toggleDrawer('menu', false)}>
                {list('menu')}
            </Drawer>
        </React.Fragment>
    );
}

export default MobileMenu;
