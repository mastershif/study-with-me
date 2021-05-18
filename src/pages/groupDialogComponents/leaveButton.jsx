import {useState} from "react";
import {Button} from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/RemoveCircleOutline";
import JoinOrLeaveAlert from "./joinOrLeaveAlert";

import { getUserFromLocalStorage } from '../../localStorage.service';

const LeaveButton = (props) => {

    const {groupId, isProfile} = props;
    const [open, setOpenConfirm] = useState(false);
    const user = getUserFromLocalStorage();

    const handleLeaving = async () => {
        const response = await fetch("http://localhost:5000/leaveGroup", {
            method: 'PUT',
            headers: { "Accept": "application/json",
                        "Content-Type": "application/json"},
            body: JSON.stringify({ email: user.email, groupId }),
        });
        if (response.status !== 200) {
            console.log('not 200');
            // need to add an alert - if the leaving didn't succeed.
        }
        else {
            console.log('is 200');
            if (isProfile) {
                console.log('profile');
                setTimeout(function () {
                    window.location.reload();
                }, 1000)
            }
            else {
                console.log('not profile');
                setOpenConfirm(true);
                document.getElementById("searchButton").click();
                setTimeout(function () {
                    document.getElementById("searchButton").click();
                }, 50)
            }
        }
    }

    const handleUndoLeaving = () => {
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
        </>
    )
}

export default LeaveButton;
