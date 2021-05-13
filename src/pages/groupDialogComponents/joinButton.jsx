import {useState} from "react";
import {Button} from "@material-ui/core";
import AddIcon from "@material-ui/icons/AddCircleOutline";
import JoinOrLeaveAlert from "./joinOrLeaveAlert";
import { getUserFromLocalStorage } from '../../localStorage.service';
import FailedToJoinAlert from "./failedToJoinAlert";

const JoinButton = ({ groupId }) => {
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openFailedToJoin, setOpenFailedToJoin] = useState(false);
    const user = getUserFromLocalStorage();

    const handleJoining = async () => {
        const response = await fetch("http://localhost:5000/joinGroup", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: user.email, groupId }),
        });
        if (response.status === 500) {
            setOpenFailedToJoin(true);
        } else {
            setOpenConfirm(true);
        };
    };

    const handleUndoJoining = () => {
        setOpenConfirm(false);
    };

    return (
        <>
            <Button variant={"contained"} color={"primary"}
                    size={"large"} onClick={handleJoining}
                    startIcon={<AddIcon />}>הצטרפות לקבוצה</Button>
            <JoinOrLeaveAlert open={openConfirm} setOpen={setOpenConfirm} handleUndo={handleUndoJoining}
                              message={"הצטרפת לקבוצה בהצלחה!"}
            />
            <FailedToJoinAlert open={openFailedToJoin} setOpen={setOpenFailedToJoin} handleUndo={() => {setOpenFailedToJoin(false)}}
                              message={"לא הצלחנו לצרף אותך לקבוצה"}
            />
        </>
    );
}

export default JoinButton;
