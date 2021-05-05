import {useState} from "react";
import {Button} from "@material-ui/core";
import AddIcon from "@material-ui/icons/AddCircleOutline";
import JoinOrLeaveAlert from "./joinOrLeaveAlert";


const JoinButton = () => {

    const [open, setOpen] = useState(false);

    const handleJoining = () => {
        setOpen(true);
    }

    const handleUndoJoining = () => {
        setOpen(false);
    }

    return (
        <>
            <Button variant={"contained"} color={"primary"}
                    size={"large"} onClick={handleJoining}
                    startIcon={<AddIcon />}>הצטרפות לקבוצה</Button>
            <JoinOrLeaveAlert open={open} setOpen={setOpen} handleUndo={handleUndoJoining}
                              message={"הצטרפת לקבוצה בהצלחה!"}
            />
        </>
    )
}

export default JoinButton;
