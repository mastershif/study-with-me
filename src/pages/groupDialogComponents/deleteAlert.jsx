import {Alert} from "@material-ui/lab";
import {Button, Snackbar} from "@material-ui/core";


const DeleteAlert = (props) => {

    const {open, setOpen, message, handleUndo} = props;

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    return (
        <Snackbar open={open} autoHideDuration={2500} onClose={handleCloseAlert}
                  anchorOrigin={{ vertical: 'top', horizontal: "center" }}>
            <Alert severity={"success"} onClose={handleCloseAlert}
                   action={
                       <Button color="secondary" size="small" onClick={handleUndo}>
                           ביטול
                       </Button>
                   } >
                {message}
            </Alert>
        </Snackbar>
    )
}

export default DeleteAlert;
