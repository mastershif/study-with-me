import GroupProfile from "./groupDialogComponents/groupProfile";
import * as Styles from "../styles/searchStyle";
import {GridList, GridListTile, isWidthUp, withWidth} from "@material-ui/core";
import SearchForm from './searchComponents/searchForm';
import {Paper} from "@material-ui/core";
import {useEffect, useState} from "react";
import {getUserID} from "./signInComponents/getUserID";


const Search = (props) => {

    const [showResults, setShowResults] = useState(false);
    const [userID, setUserID] = useState();
    const [allGroups, setAllGroups] = useState();
    const [results, setResults] = useState();
    const classes = Styles.useStyles();

    const getAllGroups = () => {
        fetch("http://localhost:5000/allGroups/", {
            credentials: "include",
        })
            .then((response) => response.json())
            .then((result) => setAllGroups(result))
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        getAllGroups();
        getUserID(setUserID);
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
