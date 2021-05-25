import {useState, useRef} from "react";
import {Button} from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import RemoveIcon from "@material-ui/icons/RemoveCircleOutline";
import FailedToJoinOrLeaveAlert from "./failedToJoinOrLeaveAlert";
import JoinOrLeaveAlert from "./joinOrLeaveAlert";
import { getUserFromLocalStorage } from '../../localStorage.service';

const LeaveButton = (props) => {

    const isLeaveAborted = useRef(false);
    const {groupId, isProfile} = props;
    const [open, setOpenConfirm] = useState(false);
    const [openLeaveWarning, setOpenLeaveWarning] = useState(false);
    const [openFailedToJoinOrLeave, setOpenFailedToJoinOrLeave] = useState(false);
    const user = getUserFromLocalStorage();

    const handleCloseOnProceed = () => {
        setOpenLeaveWarning(false);
        setOpenConfirm(true);
        setTimeout(async function() {
            if (!isLeaveAborted.current) {
                const response = await fetch("http://localhost:5000/leaveGroup", {
                    method: 'PUT',
                    headers: { "Accept": "application/json",
                                "Content-Type": "application/json"},
                    body: JSON.stringify({ email: user.email, groupId }),
                });
                if (response.status !== 200) {
                    setOpenFailedToJoinOrLeave(true);
                } else {
                    if (isProfile) {
                        setTimeout(function () {
                            window.location.reload();
                        }, 3000)
                    }
                    else {
                        document.getElementById("searchButton").click();
                        setTimeout(function () {
                            document.getElementById("searchButton").click();
                        }, 50)
                    }
                }
            } else {
                isLeaveAborted.current = false;
            }
        }, 2000)
    };

    const handleCloseOnAbort = () => {
        setOpenLeaveWarning(false);
    };

    const handleUndoLeaving = () => {
        isLeaveAborted.current = true;
        setOpenConfirm(false);
    }

    return (
        <>
            <Button variant={"contained"} color={"secondary"}
                    size={"large"} onClick={() => setOpenLeaveWarning(true)}
                    startIcon={<RemoveIcon />}>צא/י מהקבוצה</Button>
            <div>
                <Dialog
                    open={openLeaveWarning}
                    onClose={() => {}}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"יציאה מהקבוצה"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        האם את/ה בטוח/ה שברצונך לצאת מהקבוצה?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleCloseOnAbort} color="primary">
                        לא
                    </Button>
                    <Button onClick={handleCloseOnProceed} color="primary" autoFocus>
                        כן
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <JoinOrLeaveAlert open={open} setOpen={setOpenConfirm} handleUndo={handleUndoLeaving}
                              message={"יצאת מהקבוצה בהצלחה!"}
            />
            <FailedToJoinOrLeaveAlert open={openFailedToJoinOrLeave} setOpen={setOpenFailedToJoinOrLeave} handleUndo={() => {setOpenFailedToJoinOrLeave(false)}}
                               message={"לא הצלחנו להוציא אותך מהקבוצה"}
            />
        </>
    )
}

export default LeaveButton;
