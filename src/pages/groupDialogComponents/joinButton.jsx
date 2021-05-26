import {useState, useRef} from "react";
import {Button} from "@material-ui/core";
import AddIcon from "@material-ui/icons/AddCircleOutline";
import JoinOrLeaveAlert from "./joinOrLeaveAlert";
import { getUserFromLocalStorage } from '../../localStorage.service';
import FailedToJoinOrLeaveAlert from "./failedToJoinOrLeaveAlert";
import FailedToJoinOnLoginAlert from "./failedToJoinOnLoginAlert";
import BlockIcon from '@material-ui/icons/Block';


const JoinButton = (props) => {

    const {group, groupId, isGroupPage} = props;
    const isJoinAborted = useRef(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openFailedToJoinOrLeave, setOpenFailedToJoinOrLeave] = useState(false);
    const [openFailedToJoinOnLogin, setOpenFailedToJoinOnLogin] = useState(false);
    const user = getUserFromLocalStorage();

    const handleJoining = () => {
        if (user !== null) {
            setOpenConfirm(true);
            setTimeout(async function() {
                if (!isJoinAborted.current) {
                    const response = await fetch("http://localhost:5000/joinGroup", {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ email: user.email, groupId }),
                    });
                    if (response.status === 500) {
                        setOpenFailedToJoinOrLeave(true);
                    } else {
                        if (isGroupPage) {
                            window.location.reload();
                        }
                        // it means that we are on the search page.
                        else {
                            document.getElementById("searchButton").click();
                            setTimeout(function () {
                                document.getElementById("searchButton").click();
                            }, 50)
                        }
                    }
                } else {
                    isJoinAborted.current = false;
                }
            }, 2000)
        } else {
            setOpenFailedToJoinOnLogin(true)
        }
    };

    const handleUndoJoining = () => {
        isJoinAborted.current = true;
        setOpenConfirm(false);
    };

    return (
        <>
            {group.users.length < group.groupSize ?
                <Button style={{minWidth: '100%'}}
                        variant={"contained"} color={"primary"}
                        size={"large"} onClick={handleJoining}
                        startIcon={<AddIcon />}>הצטרפ/י לקבוצה</Button> :
                <Button style={{minWidth: '100%'}}
                        variant={"contained"} color={"primary"}
                        size={"large"} disabled
                        startIcon={<BlockIcon />}>הקבוצה בתפוסה מלאה</Button> }
            <JoinOrLeaveAlert open={openConfirm} setOpen={setOpenConfirm} handleUndo={handleUndoJoining}
                              message={"הצטרפת לקבוצה בהצלחה!"}
            />
            <FailedToJoinOnLoginAlert open={openFailedToJoinOnLogin} setOpen={setOpenFailedToJoinOnLogin}
                                      message={"התחבר כדי להירשם לקבוצה"}
            />
            <FailedToJoinOrLeaveAlert open={openFailedToJoinOrLeave} setOpen={setOpenFailedToJoinOrLeave} handleUndo={() => {setOpenFailedToJoinOrLeave(false)}}
                                      message={"לא הצלחנו לצרף אותך לקבוצה"}
            />
        </>
    );
}

export default JoinButton;
