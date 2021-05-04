import {useState} from "react";
import {Button, Snackbar} from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/RemoveCircleOutline";
import {Alert} from "@material-ui/lab";


const LeaveButton = () => {

    const [open, setOpen] = useState(false);

    const handleLeaving = () => {
        setOpen(true);
    }

    const handleUndoLeaving = () => {
        setOpen(false);
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    return (
        <>
            <Button variant={"contained"} color={"secondary"}
                    size={"large"} onClick={handleLeaving}
                    startIcon={<RemoveIcon />}>עזיבת הקבוצה</Button>
            <Snackbar open={open} autoHideDuration={4000} onClose={handleCloseAlert}
                      anchorOrigin={{ vertical: 'bottom', horizontal: "right" }}>
                <Alert severity={"success"} onClose={handleCloseAlert}
                       action={
                           <Button color="secondary" size="small" onClick={handleUndoLeaving}>
                               ביטול
                           </Button>
                       } >
                    עזבת את הקבוצה! הפעולה ניתנת לביטול.
                </Alert>
            </Snackbar>
        </>
    )
}

export default LeaveButton;
