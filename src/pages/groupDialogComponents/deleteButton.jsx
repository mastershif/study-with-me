import {useState, useRef} from "react";
import {Button, Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle} from "@material-ui/core";
import FailedToDeleteAlert from "./failedToDeleteAlert";
import DeleteAlert from "./deleteAlert";
import DeleteIcon from '@material-ui/icons/Delete';
import {useHistory} from "react-router-dom";


const DeleteButton = (props) => {

    const {groupId, isGroupPage, disabled} = props;
    let history = useHistory();
    const isDeleteAborted = useRef(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [openDeleteWarning, setOpenDeleteWarning] = useState(false);
    const [openFailedToDelete, setOpenFailedToDelete] = useState(false);

    const handleCloseOnProceed = () => {
        setOpenDeleteWarning(false);
        setDeleteConfirm(true);
        setTimeout(async function() {
            if (!isDeleteAborted.current) {
                const response = await fetch("http://localhost:5000/deleteGroup/" + groupId, {
                    method: "DELETE",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                if (!response.ok) {
                    setOpenFailedToDelete(true);
                }
                else {
                    if (isGroupPage) {
                        history.push('/');
                    }
                    // it means that we are on the profile or search page.
                    else {
                        window.location.reload();
                    }
                }
            }
            else {
                isDeleteAborted.current = false;
            }
        }, 2500)
    };

    const handleCloseOnAbort = () => {
        setOpenDeleteWarning(false);
    };

    const handleUndoDeleting = () => {
        isDeleteAborted.current = true;
        setDeleteConfirm(false);
    }

    return (
        <>
            <Button disabled={disabled} style={disabled ? {minWidth: '100%', color: "white", backgroundColor: "90a4ae"}
            : {minWidth: '100%', color: "white", backgroundColor: "#cc0000"}}
                    variant={"contained"} size={"large"}
                    onClick={() => setOpenDeleteWarning(true)}
                    startIcon={<DeleteIcon />}>??????/?? ??????????</Button>
            <div>
                <Dialog
                    open={openDeleteWarning}
                    onClose={() => {}}
                    maxWidth={"xs"}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"?????????? ????????????"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            ?????? ????/?? ????????/?? ?????????????? ?????????? ???? ?????????????
                        </DialogContentText>
                        <DialogContentText id="alert-dialog-description">
                            ?????????? ???? ?????? ???????? ?????????? ?????????????? ?????????? ???????????? ???????????? ???????? ?????????? ?????????? ?????? ???????????????? ?????????????? ????????.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseOnAbort} color="primary">
                            ????
                        </Button>
                        <Button onClick={handleCloseOnProceed} color="primary" autoFocus>
                            ????
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <DeleteAlert open={deleteConfirm} setOpen={setDeleteConfirm} handleUndo={handleUndoDeleting}
                         message={"???????????? ?????????? ????????????!"}
            />
            <FailedToDeleteAlert open={openFailedToDelete} setOpen={setOpenFailedToDelete} onClose={() => {}}
                                 message={"?????????? ???????? ?????? ?????????? ????????????"}
            />
        </>
    );
}

export default DeleteButton;
