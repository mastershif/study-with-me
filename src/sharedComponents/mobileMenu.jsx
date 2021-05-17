import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from "@material-ui/icons/Menu";
import LockIcon from '@material-ui/icons/Lock';
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from '@material-ui/icons/Add';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import {Link, useHistory} from "react-router-dom";
import {GoogleLogout} from "react-google-login";
import {removeUserFromLocalStorage} from "../localStorage.service";

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

const MobileMenu = ({ isLoggedIn, setIsLoggedIn }) => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const history = useHistory();
    const navigationOptions = isLoggedIn ? ['חיפוש קבוצה', 'יצירת קבוצה', 'פרופיל', 'יציאה'] : ['התחברות', 'חיפוש קבוצה'];
    const menuIcons = isLoggedIn ? [<SearchIcon />, <AddIcon />, <PersonOutlineIcon />, <LockIcon />] : [<LockIcon />, <SearchIcon />];
    const menuPaths = isLoggedIn ? ['/search', '/createGroup', '/profile'] : ['/signIn', '/search'];

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

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
                                        clientId={
                                            "101612216779-7o7aqog0rj9vopdu7ffukfs67i6n4ba7.apps.googleusercontent.com"
                                        }
                                        onLogoutSuccess={onLogoutGoogle}
                                        onFailure={onLogoutGoogleFailure}
                                        render={renderProps => (
                                            <button className={classes.signOutButton} onClick={renderProps.onClick} disabled={renderProps.disabled}>
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
