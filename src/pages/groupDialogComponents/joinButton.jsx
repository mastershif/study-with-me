import {useState} from "react";
import {Button, Snackbar} from "@material-ui/core";
import AddIcon from "@material-ui/icons/AddCircleOutline";
import {Alert} from "@material-ui/lab";


const JoinButton = () => {

    const [open, setOpen] = useState(false);

    const handleJoining = () => {
        setOpen(true);
    }

    const handleUndoJoining = () => {
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
            <Button variant={"contained"} color={"primary"}
                    size={"large"} onClick={handleJoining}
                    startIcon={<AddIcon />}>הצטרפות לקבוצה</Button>
            <Snackbar open={open} autoHideDuration={4000} onClose={handleCloseAlert}
                      anchorOrigin={{ vertical: 'bottom', horizontal: "right" }}>
                <Alert severity={"success"} onClose={handleCloseAlert}
                       action={
                           <Button color="secondary" size="small" onClick={handleUndoJoining}>
                               ביטול
                           </Button>
                       } >
                    הצטרפת לקבוצה בהצלחה!
                </Alert>
            </Snackbar>
        </>
    )
}

export default JoinButton;
