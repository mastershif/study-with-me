import {useState, useRef} from "react";
import {Button} from "@material-ui/core";
import AddIcon from "@material-ui/icons/AddCircleOutline";
import JoinOrLeaveAlert from "./joinOrLeaveAlert";
import FailedToJoinOrLeaveAlert from "./failedToJoinOrLeaveAlert";
import FailedOnLoginDialog from "../../sharedComponents/failedOnLoginDialog"
import BlockIcon from '@material-ui/icons/Block';
import {isAuth} from "../signInComponents/isAuth";


const JoinButton = (props) => {

    const {group, groupId, isGroupPage} = props;
    const isJoinAborted = useRef(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openFailedToJoinOrLeave, setOpenFailedToJoinOrLeave] = useState(false);
    const [openFailedToJoinOnLogin, setOpenFailedToJoinOnLogin] = useState(false);

    const handleJoining = async () => {
        if (await isAuth()) {
            setOpenConfirm(true);
            setTimeout(async function() {
                if (!isJoinAborted.current) {
                    const response = await fetch("http://localhost:5000/joinGroup", {
                        method: "PUT",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ groupId }),
                    });
                    if (!response.ok) {
                        setOpenFailedToJoinOrLeave(true);
                    } else {
                        if (isGroupPage) {
                            window.location.reload();
                        }
                        // it means that we are on the search page.
                        else {
                            document.getElementById("searchButton")?.click();
                            setTimeout(function () {
                                document.getElementById("searchButton")?.click();
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
            <FailedOnLoginDialog open={openFailedToJoinOnLogin} setOpen={setOpenFailedToJoinOnLogin}
                                      message={"התחבר/י כדי להירשם לקבוצה"}
            />
            <FailedToJoinOrLeaveAlert open={openFailedToJoinOrLeave} setOpen={setOpenFailedToJoinOrLeave} handleUndo={() => {setOpenFailedToJoinOrLeave(false)}}
                                      message={"לא הצלחנו לצרף אותך לקבוצה"}
            />
        </>
    );
}

export default JoinButton;
