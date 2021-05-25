import * as Styles from "../styles/groupDialogStyle"
import {Dialog, DialogContent, DialogTitle,} from "@material-ui/core";
import GroupHeader from "./groupPageComponents/groupHeader";
import GroupAccordion from "./groupPageComponents/groupAccordion";
import GroupButtons from "./groupPageComponents/groupButtons";


const GroupDialog = (props) => {

    const {group, open, onClose, isProfile, userID} = props;
    const classes = Styles.useStyles();

    return (
        <Dialog classes={{paper: classes.dialog}} onClose={onClose} open={open} fullWidth>
            <DialogTitle onClose={onClose}>
                <GroupHeader group={group} onClose={onClose} isGroupPage={false} />
            </DialogTitle>
            <DialogContent dividers>
                <GroupAccordion group={group} userID={userID} isGroupPage={false} />
            </DialogContent>
            <GroupButtons group={group} userID={userID}
                          isProfile={isProfile} isGroupPage={false} />
        </Dialog>
    )
}

export default GroupDialog;
