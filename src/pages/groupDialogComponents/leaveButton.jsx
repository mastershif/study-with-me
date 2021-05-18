import {useState} from "react";
import {Button} from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/RemoveCircleOutline";
import JoinOrLeaveAlert from "./joinOrLeaveAlert";

import { getUserFromLocalStorage } from '../../localStorage.service';

const LeaveButton = ({groupId}) => {

    const [open, setOpen] = useState(false);
    const [error, setError] = useState(null);
    const user = getUserFromLocalStorage();

    const handleLeaving = async () => {
        await fetch("http://localhost:5000/leaveGroup", {
            method: 'PUT',
            headers: { "Accept": "application/json",
                        "Content-Type": "application/json"},
            body: JSON.stringify({ email: user.email, groupId }),
        })
        .then(() => { setOpen(true)}, (error) => {  setOpen(true)
                                                        setError(error)
                                                        console.log('Error in fetch operation:' , error)})
    }

    const handleUndoLeaving = () => {
        setOpen(false);
    }

    return (
        <>
            <Button variant={"contained"} color={"secondary"}
                    size={"large"} onClick={handleLeaving}
                    startIcon={<RemoveIcon />}>צא/י מהקבוצה</Button>
            <JoinOrLeaveAlert open={open} setOpen={setOpen} handleUndo={handleUndoLeaving}
                              message={"יצאת מהקבוצה בהצלחה!"}
            />
        </>
    )
}

export default LeaveButton;
