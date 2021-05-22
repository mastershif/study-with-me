import {useState, useRef} from "react";
import {Button} from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/RemoveCircleOutline";
import FailedToJoinOrLeaveAlert from "./failedToJoinOrLeaveAlert";
import JoinOrLeaveAlert from "./joinOrLeaveAlert";

import { getUserFromLocalStorage } from '../../localStorage.service';

const LeaveButton = (props) => {

    const isLeaveAborted = useRef(false);
    const {groupId, isProfile} = props;
    const [open, setOpenConfirm] = useState(false);
    const [openFailedToJoinOrLeave, setOpenFailedToJoinOrLeave] = useState(false);
    const user = getUserFromLocalStorage();

    const handleLeaving = () => {
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
    }

    const handleUndoLeaving = () => {
        isLeaveAborted.current = true;
        setOpenConfirm(false);
    }

    return (
        <>
            <Button variant={"contained"} color={"secondary"}
                    size={"large"} onClick={handleLeaving}
                    startIcon={<RemoveIcon />}>צא/י מהקבוצה</Button>
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
