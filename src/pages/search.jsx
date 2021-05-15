import GroupProfile from "./groupDialogComponents/groupProfile";
import * as Styles from "../styles/searchStyle";
import {GridList, GridListTile, isWidthUp, withWidth} from "@material-ui/core";
import SearchForm from './searchComponents/searchForm';
import {Paper} from "@material-ui/core";
import {useEffect, useState} from "react";


const Search = (props) => {

    const [showResults, setShowResults] = useState(false);
    const [allGroups, setAllGroups] = useState();
    const [results, setResults] = useState();
    const classes = Styles.useStyles();

    const getAllGroups = () => {
        fetch("http://localhost:5000/allGroups/")
            .then((response) => response.json())
            .then((result) => setAllGroups(result))
            .catch((error) => console.log(error));
    }

    useEffect(() => {getAllGroups()}, []);

    console.log(allGroups);
    console.log(results);

    const getColumns = () => {
        if (isWidthUp('xl', props.width)) {return 5;}
        if (isWidthUp('lg', props.width)) {return 4;}
        if (isWidthUp('md', props.width)) {return 3;}
        if (isWidthUp('sm', props.width)) {return 2;}
        return 1;
    }

    return (
        <Paper className={classes.page} elevation={0}>
            <SearchForm allGroups={allGroups} setResults={setResults} setShowResults={setShowResults}/>
            { showResults &&
            <Styles.GroupsList>
                <GridList cellHeight={'auto'} spacing={0}
                          cols={Math.min(results.length, getColumns())}>
                    {results && results.map(group => (
                        <GridListTile key={group.item._id} cols={1}>
                            <GroupProfile group={group.item} isProfile={false} />
                        </GridListTile>
                    ))}
                </GridList>
            </Styles.GroupsList>
            }
        </Paper>
    )
}

export default withWidth()(Search);
