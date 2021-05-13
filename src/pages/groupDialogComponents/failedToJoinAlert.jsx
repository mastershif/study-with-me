import {Alert} from "@material-ui/lab";
import {Button, Snackbar} from "@material-ui/core";


const FailedToJoinAlert = (props) => {

    const {open, setOpen, message, handleUndo} = props;

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    return (
        <Snackbar open={open} autoHideDuration={4000} onClose={handleCloseAlert}
                  anchorOrigin={{ vertical: 'top', horizontal: "center" }}>
            <Alert severity={"error"} onClose={handleCloseAlert}
                   action={
                       <Button color="secondary" size="small" onClick={handleUndo}>
                           הבנתי
                       </Button>
                   } >
                {message}
            </Alert>
        </Snackbar>
    )
}

export default FailedToJoinAlert;
