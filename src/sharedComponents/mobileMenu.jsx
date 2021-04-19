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
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from '@material-ui/icons/Add';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { Link } from "react-router-dom";

const menuIcons = [<PersonOutlineIcon />, <SearchIcon />, <AddIcon />, <PersonOutlineIcon />];
const menuPaths = ['/signIn', '/search', '/createGroup', '/profile'];

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

const MobileMenu = () => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

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
                {['התחברות / הרשמה', 'חיפוש קבוצה', 'יצירת קבוצה', 'פרופיל'].map((text, index) => (
                    <Link to={menuPaths[index]} className={classes.link}>
                        <List>
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {menuIcons[index]}
                                </ListItemIcon>
                                <ListItemText primary={text} />
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
