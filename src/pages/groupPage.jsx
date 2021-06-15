import * as Styles from "../styles/groupPageStyle";
import GroupHeader from "./groupPageComponents/groupHeader";
import {Card, Divider} from "@material-ui/core";
import GroupAccordion from "./groupPageComponents/groupAccordion";
import GroupButtons from "./groupPageComponents/groupButtons";
import {useEffect, useState} from "react";
import {setUserFromDB} from "./signInComponents/setUserFromDB";


const GroupPage = (props) => {

    const {group} = props;
    const [user, setUser] = useState();
    const classes = Styles.useStyles();

    useEffect(() => {
        setUserFromDB(setUser).then();
    }, []);

    return (
        user?._id !== undefined ?
            <div className={classes.page}>
                <Card className={classes.card}>
                    <GroupHeader group={group} onClose={false} isGroupPage={true} userID={user?._id}/>
                    <Divider />
                    <GroupAccordion group={group} userID={user?._id} isGroupPage={true} />
                    <div className={classes.groupButtons}>
                        <GroupButtons group={group} userID={user?._id}
                                      isProfile={false} isGroupPage={true} />
                    </div>
                </Card>
            </div> : <></>
    )
}

export default GroupPage;
