import {useState, useRef} from "react";
import {Button} from "@material-ui/core";
import AddIcon from "@material-ui/icons/AddCircleOutline";
import JoinOrLeaveAlert from "./joinOrLeaveAlert";
import { getUserFromLocalStorage } from '../../localStorage.service';
import FailedToJoinAlert from "./failedToJoinAlert";
import FailedToJoinOnLoginAlert from "./failedToJoinOnLoginAlert";
import BlockIcon from '@material-ui/icons/Block';

const JoinButton = ({ group, groupId }) => {
    const isAborted = useRef(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openFailedToJoin, setOpenFailedToJoin] = useState(false);
    const [openFailedToJoinOnLogin, setOpenFailedToJoinOnLogin] = useState(false);
    const user = getUserFromLocalStorage();

    const handleJoining = () => {
        setOpenConfirm(true);
        if (user !== null) {
            setTimeout(async function() {
                if (!isAborted.current) {
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
                        document.getElementById("searchButton").click();
                        setTimeout(function () {
                            document.getElementById("searchButton").click();
                        }, 50)
                    }
                } else {
                    isAborted.current = false;
                }
            }, 2000)
        } else {
            setOpenFailedToJoinOnLogin(true)
        }
    };

    const handleUndoJoining = () => {
        isAborted.current = true;
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
