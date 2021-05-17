import {useState} from "react";
import {Button} from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/RemoveCircleOutline";
import JoinOrLeaveAlert from "./joinOrLeaveAlert";


const LeaveButton = () => {

    const [open, setOpen] = useState(false);

    const handleLeaving = () => {
        setOpen(true);
    }

    const handleUndoLeaving = () => {
        setOpen(false);
    }

    return (
        <>
            <Button variant={"contained"} color={"secondary"}
                    size={"large"} onClick={handleLeaving}
                    startIcon={<RemoveIcon />}>צא מהקבוצה</Button>
            <JoinOrLeaveAlert open={open} setOpen={setOpen} handleUndo={handleUndoLeaving}
                              message={"עזבת את הקבוצה!"}
            />
        </>
    )
}

export default LeaveButton;
