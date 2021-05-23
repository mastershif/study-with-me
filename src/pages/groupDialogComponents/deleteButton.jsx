import {useState, useRef} from "react";
import {Button} from "@material-ui/core";
import FailedToDeleteAlert from "./failedToDeleteAlert";
import DeleteAlert from "./deleteAlert";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';

const DeleteButton = ({ group, groupId }) => {
    const isDeleteAborted = useRef(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [openDeleteWarning, setOpenDeleteWarning] = useState(false);
    const [openFailedToDelete, setOpenFailedToDelete] = useState(false);

    const handleUndoDeleting = () => {
        isDeleteAborted.current = true;
        setDeleteConfirm(false);
    }

    const handleCloseOnAbort = () => {
        setOpenDeleteWarning(false);
    };

    const handleCloseOnProceed = () => {
        setOpenDeleteWarning(false);
        setDeleteConfirm(true);
        setTimeout(async function() {
            if (!isDeleteAborted.current) {
                const response = await fetch("http://localhost:5000/deleteGroup/" + groupId, {
                    method: "DELETE"
                });
                if (response.status === 500) {
                    setOpenFailedToDelete(true);
                } else {
                    window.location.reload();
                };
            } else {
                isDeleteAborted.current = false;
            }
        }, 2500)
    };

    return (
        <>
            <Button variant={"contained"} style={{color: "white", backgroundColor: "#cc0000"}}
                    size={"large"} onClick={() => setOpenDeleteWarning(true)}
                    startIcon={<DeleteIcon />}>מחק/י קבוצה</Button>
            <div>
                <Dialog
                    open={openDeleteWarning}
                    onClose={() => {}}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"מחיקת הקבוצה"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        האם אתה בטוח שברצונך למחוק את הקבוצה?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleCloseOnAbort} color="primary">
                        לא
                    </Button>
                    <Button onClick={handleCloseOnProceed} color="primary" autoFocus>
                        כן
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <DeleteAlert open={deleteConfirm} setOpen={setDeleteConfirm} handleUndo={handleUndoDeleting}
                              message={"הקבוצה נמחקה בהצלחה!"}
            />
            <FailedToDeleteAlert open={openFailedToDelete} setOpen={setOpenFailedToDelete} onClose={() => {}}
                              message={"הייתה תקלה בעת מחיקת הקבוצה"}
            />
        </>
    );
}

export default DeleteButton;
