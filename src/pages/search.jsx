import GroupProfile from "./groupDialogComponents/groupProfile";
import * as Styles from "../styles/searchStyle";
import {GridList, GridListTile, isWidthUp, withWidth} from "@material-ui/core";
import SearchForm from './searchComponents/searchForm';
import {Paper} from "@material-ui/core";
import {useEffect, useState} from "react";
import { getUserFromLocalStorage } from '../localStorage.service';


const Search = (props) => {

    const [showResults, setShowResults] = useState(false);
    const [userID, setUserID] = useState();
    const [allGroups, setAllGroups] = useState();
    const [results, setResults] = useState();
    const classes = Styles.useStyles();
    const user = getUserFromLocalStorage();

    const getAllGroups = () => {
        fetch("http://localhost:5000/allGroups/")
            .then((response) => response.json())
            .then((result) => setAllGroups(result))
            .catch((error) => console.log(error));
    }

    const getUserID = (user) => {
        if (user !== null) {
            fetch("http://localhost:5000/profileSettings/" + user.email)
                .then((response) => response.json())
                .then((result) => setUserID(result._id))
                .catch((error) => console.log(error));
        } else {
            setUserID(0);
        }
    }

    useEffect(() => {
        getAllGroups();
        getUserID(user);
    }, []);

    const getColumns = () => {
        if (isWidthUp('xl', props.width)) {return 5;}
        if (isWidthUp('lg', props.width)) {return 4;}
        if (isWidthUp('md', props.width)) {return 3;}
        if (isWidthUp('sm', props.width)) {return 2;}
        return 1;
    }

    return (
        <Paper className={classes.page} elevation={0}>
            <SearchForm allGroups={allGroups} getAllGroups={getAllGroups}
                        setResults={setResults} setShowResults={setShowResults}/>
            { showResults &&
            <Styles.GroupsList>
                <GridList cellHeight={'auto'} spacing={0}
                          cols={Math.min(results.length, getColumns())}>
                    {results && results.map(group => (
                        <GridListTile key={group.item._id} cols={1}>
                            <GroupProfile group={group.item} isProfile={false} userID={userID} />
                        </GridListTile>
                    ))}
                </GridList>
            </Styles.GroupsList>
            }
        </Paper>
    )
}

export default withWidth()(Search);
