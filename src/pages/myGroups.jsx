import {GridList, GridListTile, isWidthUp, Paper, withWidth} from "@material-ui/core";
import * as Styles from "../styles/myGroupsStyle";
import GroupProfile from "./groupDialogComponents/groupProfile";
import PaginationLine from "../sharedComponents/pagination";
import React, {useEffect, useState} from "react";
import {isAuth} from "./signInComponents/isAuth";
import SecondaryTitle from "../sharedComponents/secondaryTitle";


const MyGroups = (props) => {

    const [userID, setUserID] = useState();
    const [groups, setGroups] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(1);
    let pageGroups = [], columns = 1, totalPages = 1;
    const classes = Styles.useStyles();

    const getColumns = () => {
        if (isWidthUp("xl", props.width)) {return 5}
        if (isWidthUp("lg", props.width)) {return 4}
        if (isWidthUp("md", props.width)) {return 3}
        if (isWidthUp("sm", props.width)) {return 2}
        return 1;
    };

    useEffect(() => {
        if (isAuth().then) {
            fetch("http://localhost:5000/profile/userGroups", {
                credentials: "include",
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json()
                    }
                    return Promise.reject(res.json());
                })
                .then(
                    (result) => {
                        setUserID(result[0]);
                        setGroups(result[1]);
                        setItemsPerPage(Math.max(2 * getColumns(), 4));
                    }
                )
                .catch((error) => {console.log("There was a problem!", error)});
        }
    }, []);

    if (groups) {
        totalPages = Math.ceil(groups.length / itemsPerPage);
        pageGroups = groups.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
        columns = Math.min(pageGroups.length, getColumns());
    }

    console.log('the userID is: ', userID);
    console.log('the groups?.length is: ', groups?.length);
    return (
        <Paper className={classes.page} elevation={0}>
            <Styles.Title>הקבוצות שלי</Styles.Title>
            {
                userID ?
                    <div>
                        <Styles.GroupsList>
                            {
                                groups?.length ?
                                    <GridList cellHeight={"auto"} spacing={0} cols={columns}>
                                        {pageGroups.map((group) => (
                                            <GridListTile key={group._id} cols={1}>
                                                <GroupProfile group={group} isProfile={true} userID={userID} />
                                            </GridListTile>
                                        ))}
                                    </GridList>
                                    :
                                    <SecondaryTitle text={'עוד לא הצטרפת לאף קבוצה...'} />
                            }
                        </Styles.GroupsList>
                        <PaginationLine totalPages={totalPages}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage} />
                    </div> :
                    <></>
            }
        </Paper>
    )
}

export default withWidth()(MyGroups);
