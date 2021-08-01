import {useState, useRef} from "react";
import {Button, Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle} from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/RemoveCircleOutline";
import FailedToJoinOrLeaveAlert from "./failedToJoinOrLeaveAlert";
import JoinOrLeaveAlert from "./joinOrLeaveAlert";

const LeaveButton = (props) => {

    const isLeaveAborted = useRef(false);
    const {groupId, isProfile, isGroupPage, disabled} = props;
    const [open, setOpenConfirm] = useState(false);
    const [openLeaveWarning, setOpenLeaveWarning] = useState(false);
    const [openFailedToJoinOrLeave, setOpenFailedToJoinOrLeave] = useState(false);

    const handleCloseOnProceed = () => {
        setOpenLeaveWarning(false);
        setOpenConfirm(true);
        setTimeout(async function() {
            if (!isLeaveAborted.current) {
                const response = await fetch("http://localhost:5000/leaveGroup", {
                    method: 'PUT',
                    credentials: "include",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ groupId }),
                });
                if (!response.ok) {
                    setOpenFailedToJoinOrLeave(true);
                }
                else {
                    if (isProfile) {
                        setTimeout(function () {
                            window.location.reload();
                        }, 3000)
                    }
                    else {
                        if (isGroupPage) {
                            window.location.reload();
                        }
                        else {
                            document.getElementById("searchButton")?.click();
                            setTimeout(function () {
                                document.getElementById("searchButton")?.click();
                            }, 800)
                        }
                    }
                }
            }
            else {
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
            <Button disabled={disabled} style={{minWidth: '100%'}} variant={"contained"} color={disabled? "90a4ae" : "secondary"}
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
            <FailedToJoinOrLeaveAlert open={openFailedToJoinOrLeave} setOpen={setOpenFailedToJoinOrLeave}
                                      handleUndo={() => {setOpenFailedToJoinOrLeave(false)}}
                                      message={"לא הצלחנו להוציא אותך מהקבוצה"}
            />
        </>
    )
}

export default LeaveButton;
