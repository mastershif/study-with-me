import * as Styles from "../styles/groupPageStyle";
import GroupHeader from "./groupPageComponents/groupHeader";
import {Card, Divider} from "@material-ui/core";
import GroupAccordion from "./groupPageComponents/groupAccordion";
import GroupButtons from "./groupPageComponents/groupButtons";
import {useEffect, useState} from "react";
import {getUserID} from "./signInComponents/getUserID";


const GroupPage = (props) => {

    const {group} = props;
    const [userID, setUserID] = useState();
    const classes = Styles.useStyles();

    useEffect(() => {
        getUserID(setUserID);
    }, []);

    return (
        <div className={classes.page}>
            <Card className={classes.card}>
                <GroupHeader group={group} onClose={false} isGroupPage={true} />
                <Divider />
                <GroupAccordion group={group} userID={userID} isGroupPage={true} />
                <div className={classes.groupButtons}>
                    <GroupButtons group={group} userID={userID}
                                  isProfile={false} isGroupPage={true} />
                </div>
            </Card>
        </div>
    )
}

export default GroupPage;
