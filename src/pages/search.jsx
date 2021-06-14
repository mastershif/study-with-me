import {useEffect, useState} from "react";
import GroupProfile from "./groupDialogComponents/groupProfile";
import * as Styles from "../styles/searchStyle";
import {GridList, GridListTile, isWidthUp, Paper, withWidth} from "@material-ui/core";
import SearchForm from './searchComponents/searchForm';
import {setUserFromDB} from "./signInComponents/setUserFromDB";
import PaginationLine from "../sharedComponents/pagination";


const Search = (props) => {

    const [user, setUser] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [allGroups, setAllGroups] = useState();
    const [results, setResults] = useState();
    const [totalPages, setTotalPages] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(1);
    let pageResults = [], columns = 1;
    const classes = Styles.useStyles()

    const getAllGroups = async () => {
        await fetch("http://localhost:5000/allGroups/", {
            credentials: "include",
        })
            .then((response) => response.json())
            .then((result) => setAllGroups(result))
            .catch((error) => console.log(error));
    }

    const getColumns = () => {
        if (isWidthUp('xl', props.width)) {return 5}
        if (isWidthUp('lg', props.width)) {return 4}
        if (isWidthUp('md', props.width)) {return 3}
        if (isWidthUp('sm', props.width)) {return 2}
        return 1;
    }

    useEffect(() => {
        getAllGroups().then();
        setUserFromDB(setUser).then();
        setItemsPerPage(Math.max(2 * getColumns(), 4));
    }, []);

    if (results) {
        pageResults = results.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
        columns = Math.min(pageResults.length, getColumns());
    }

    return (
        <Paper className={classes.page} elevation={0}>
            <SearchForm allGroups={allGroups} getAllGroups={getAllGroups}
                        setResults={setResults} setShowResults={setShowResults}
                        setTotalPages={setTotalPages} itemsPerPage={itemsPerPage}
                        setCurrentPage={setCurrentPage} user={user}
            />
            { showResults &&
            <div>
                <Styles.GroupsList>
                    <GridList cellHeight={'auto'} spacing={0} cols={columns}>
                        {results && pageResults.map(group => (
                            <GridListTile key={group.item._id} cols={1}>
                                <GroupProfile group={group.item} isProfile={false} userID={user?._id} />
                            </GridListTile>
                        ))}
                    </GridList>
                </Styles.GroupsList>
                <PaginationLine totalPages={totalPages}
                                currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>
            }
        </Paper>
    )
}

export default withWidth()(Search);
