import {useState} from "react";
import {Button} from "@material-ui/core";
import AddIcon from "@material-ui/icons/AddCircleOutline";
import JoinOrLeaveAlert from "./joinOrLeaveAlert";
import { getUserFromLocalStorage } from '../../localStorage.service';
import FailedToJoinAlert from "./failedToJoinAlert";
import FailedToJoinOnLoginAlert from "./failedToJoinOnLoginAlert";
import BlockIcon from '@material-ui/icons/Block';

const JoinButton = ({ group, groupId }) => {
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openFailedToJoin, setOpenFailedToJoin] = useState(false);
    const [openFailedToJoinOnLogin, setOpenFailedToJoinOnLogin] = useState(false);
    const user = getUserFromLocalStorage();

    const handleJoining = async () => {
        if (user !== null) {
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
                document.getElementById("searchButton").click();
            }
        } else {
            setOpenFailedToJoinOnLogin(true)
        }
    };

    const handleUndoJoining = () => {
        setOpenConfirm(false);
    };

    return (
        <>
            {group.users.length < group.groupSize ? <Button variant={"contained"} color={"primary"}
                                                        size={"large"} onClick={handleJoining}
                                                        startIcon={<AddIcon />}>הצטרפ/י לקבוצה</Button> :
                                                        <Button variant={"contained"} color={"primary"}
                                                        size={"large"} disabled
                                                        startIcon={<BlockIcon />}>הקבוצה בתפוסה מלאה</Button> }
            <JoinOrLeaveAlert open={openConfirm} setOpen={setOpenConfirm} handleUndo={handleUndoJoining}
                              message={"הצטרפת לקבוצה בהצלחה!"}
            />
            <FailedToJoinOnLoginAlert open={openFailedToJoinOnLogin} setOpen={setOpenFailedToJoinOnLogin}
                              message={"עליך להתחבר כדי להירשם לקבוצה!"}
            />
            <FailedToJoinAlert open={openFailedToJoin} setOpen={setOpenFailedToJoin} handleUndo={() => {setOpenFailedToJoin(false)}}
                              message={"לא הצלחנו לצרף אותך לקבוצה"}
            />
        </>
    );
}

export default JoinButton;
